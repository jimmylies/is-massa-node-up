import { Client, TextChannel, GatewayIntentBits } from "discord.js";
import cron from "node-cron";
import * as dotenv from "dotenv";
import customClient, { walletAddress } from "./client.js";
import { Client as MassaClient } from "@massalabs/massa-web3";

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = "1152637657088802969";

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
  // const walletAddress = customClient.wallet().getBaseAccount().address;

  // Schedule a task to run every 5 minutes
  if (channel) {
    cron.schedule("*/5 * * * *", async () => {
      async function getNodeStatus(massaClient: MassaClient) {
        try {
          const node = await massaClient.publicApi().getNodeStatus();
          channel.send(`✅ Node is up for ${walletAddress}`);
        } catch (e) {
          console.log(e);
          channel.send(`@everyone 🚨 Node crashed for ${walletAddress}`);
        }
      }
      getNodeStatus(customClient);
    });
  }
});

client.login(TOKEN);
