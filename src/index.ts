import { Client, TextChannel, GatewayIntentBits } from "discord.js";
import cron from "node-cron";
import * as dotenv from "dotenv";
import customClients, { baseAccounts } from "./client.js";
import {
  IBaseAccount,
  IRollsData,
  Client as MassaClient,
} from "@massalabs/massa-web3";

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID || '';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  const channel = client.channels.cache.get(CHANNEL_ID) as TextChannel;

  if (channel) {
    // Schedule a task to run every 5 minutes
    cron.schedule("*/5 * * * *", async () => {
      async function getNodeStatus(
        _client: MassaClient,
        _baseAccount: IBaseAccount
      ) {
        try {
          await _client.publicApi().getNodeStatus();
        } catch (e) {
          console.log(e);
          channel.send(
            `@everyone 🚨 Node crashed for ${_baseAccount.address()}`
          );
        }
      }
      if (!baseAccounts[0]) return;
      getNodeStatus(customClients[0], baseAccounts[0]);
    });

    // Schedule a task to run every 40 minutes
    cron.schedule("*/30 * * * *", async () => {
      async function autoBuyRolls(
        _client: MassaClient,
        _baseAccount: IBaseAccount
      ) {
        try {
          await _client.publicApi().getNodeStatus();
          const balance = await _client
            .wallet()
            .getAccountBalance(_baseAccount.address());
          if (balance) {
            if (balance.final >= BigInt(100 * 10 ** 9)) {
              const rollsParam: IRollsData = {
                fee: 0n,
                amount: balance.final / (100n * 10n ** 9n),
              };

              await _client.wallet().buyRolls(rollsParam, _baseAccount);
              channel.send(
                `${_baseAccount.address()} bought ${Number(
                  rollsParam.amount
                )} rolls`
              );
            }
          }
        } catch (e) {
          console.log("error");
        }
      }
      baseAccounts.forEach((baseAccount, index) => {
        if (!baseAccount) return;
        autoBuyRolls(customClients[index], baseAccount);
      });
    });
  }
});

client.login(TOKEN);
