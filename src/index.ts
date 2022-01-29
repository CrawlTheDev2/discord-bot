import "module-alias/register";
import "dotenv/config";
import DiscordBot from "./DiscordBot";
import { Deps } from "@/utils/deps";

const client = Deps.add<DiscordBot>(
  DiscordBot,
  new DiscordBot({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
  }),
);

client.start();
