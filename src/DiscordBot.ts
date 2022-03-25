import { Client } from "discord.js";

import { registerCommands, registerEvents, CacheManager, Deps } from "@/utils";
import Configs from "@/configs";
import { ClientFiles } from "./utils/defs";

class DiscordBot extends Client {
  readonly configs = Configs;

  // shortcuts
  cacheManager?: CacheManager;

  connected: boolean;

  // files
  files: ClientFiles = {
    events: [],
    commands: []
  };

  async start(skipFiles?: boolean): Promise<void> {
    if (!skipFiles) {
      this.files.events = await registerEvents(this, "../events");
      this.files.commands = await registerCommands(this, "../commands");
    }

    // log in to the app
    try {
      console.log("Connecting to discord");
      await this.login(process.env.DISCORD_APP_TOKEN);
      console.log("Connected to discord");
      this.connected = true;
    } catch (e) {
      console.error(e);
      this.connected = false;
    }

    if (!this.connected) {
      console.error("FAILED TO CONNECT DISCORD!");
      console.log("RETRYING TO CONNECT DISCORD...");
      this.start(true);
    }

    // initialise managers
    this.initManagers();
  }

  private initManagers(): void {
    this.cacheManager = Deps.add(CacheManager, new CacheManager(this));
    this.cacheManager.init();
  }
}

export default DiscordBot;
