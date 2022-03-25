import { Constants } from "discord.js";

import { Definetions, Deps } from "@/utils";
import DiscordBot from "@/DiscordBot";

class ReadyEvent extends Definetions.BaseEvent {
  constructor(private client = Deps.get<DiscordBot>(DiscordBot)) {
    super(Constants.Events.CLIENT_READY);
  }

  async handle() {
    console.log("Signed in as " + this.client.user?.tag);
  }
}

export default ReadyEvent;
