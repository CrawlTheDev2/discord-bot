import { Client } from "discord.js";

import { registerCommands, registerEvents, CacheManager, Deps } from "@/utils";
import Configs from "@/configs";

class DiscordBot extends Client {
  readonly configs = Configs;
  cacheManager: CacheManager;

  async start(): Promise<void> {
    const events = await registerEvents(this, "../events"),
      commands = await registerCommands(this, "../commands");

    this.cacheManager = Deps.add(CacheManager, new CacheManager(this, commands, events));
    await this.login(process.env.DISCORD_APP_TOKEN);

    this.cacheManager.init();
  }
}

export default DiscordBot;
