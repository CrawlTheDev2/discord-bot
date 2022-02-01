import "module-alias/register";
import "dotenv/config";
import "reflect-metadata";

import DiscordBot from "./DiscordBot";
import { Deps } from "@utils/deps";
import { createConnection } from "typeorm";
import Configs from "./configs";

const start = async () => {
  await createConnection(Configs.Database);

  const client = Deps.add<DiscordBot>(
    DiscordBot,
    new DiscordBot({
      intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
    }),
  );

  client.start();
};

start();
