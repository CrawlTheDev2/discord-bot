import { Constants, Guild } from "discord.js";
import { BaseEvent } from "@utils/defs";
import { Deps } from "@/utils/deps";
import DiscordBot from "@/DiscordBot";

class GuildDeleteEvent extends BaseEvent {
  constructor(private client = Deps.get<DiscordBot>(DiscordBot)) {
    super(Constants.Events.GUILD_DELETE);
  }

  async handle(guild: Guild) {
    console.log("Left from:", guild.id);

    const guildOwner = await this.client.users.fetch(guild.ownerId);
    guildOwner
      .send(
        `I hope I didn't make a mistake. I will wait for you to add me back to the **${guild.name}** server :)`
      )
      .catch(() => console.log("[GUILD_DELETE] Cannot send message to", guildOwner.id));
  }
}

export default GuildDeleteEvent;
