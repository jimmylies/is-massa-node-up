import { Client, TextChannel, GatewayIntentBits } from "discord.js";
import cron from "node-cron";
import * as dotenv from "dotenv";
import { client1, client2 } from "./client.js";

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

  // Schedule a task to run every 5 minutes
  cron.schedule("*/1 * * * *", async () => {
    const channel = client.channels.cache.get(CHANNEL_ID) as TextChannel;
    if (channel) {
      async function getNodeStatus(client: any, number: number) {
        try {
          const node = await client.publicApi().getNodeStatus();
          console.log(node);
          channel.send(`Node ${number} is up`);
        } catch (e) {
          console.log(e);
          channel.send(`@everyone Node ${number} crashed`);
        }
      }
      getNodeStatus(client1, 1);
      getNodeStatus(client2, 2);
    }
  });
});

client.login(TOKEN);
