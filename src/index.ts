import "module-alias/register";
import "dotenv/config";
import "reflect-metadata";

import { createConnection } from "typeorm";

import DiscordBot from "./DiscordBot";
import Configs from "./configs";
import { Deps } from "./utils";

const start = async () => {
  await createConnection(Configs.Database);

  const client = Deps.add<DiscordBot>(
    DiscordBot,
    new DiscordBot({
      intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
    })
  );

  client.start();
};

start();
