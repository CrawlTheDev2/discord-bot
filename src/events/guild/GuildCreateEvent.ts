import { Constants, Guild } from "discord.js";
import { getRepository } from "typeorm";

import DiscordBot from "@/DiscordBot";
import { Definetions, Deps } from "@/utils";
import { GuildEntity } from "@typeorm/entities/GuildEntity";

class GuildCreateEvent extends Definetions.BaseEvent {
  constructor(
    private client = Deps.get<DiscordBot>(DiscordBot),
    private guildRepository = getRepository(GuildEntity)
  ) {
    super(Constants.Events.GUILD_CREATE);
  }

  async handle({ id, systemChannel, name }: Guild) {
    console.log("Joined to:", id);

    const cachedGuild = this.client.cacheManager.guilds.get(id);

    if (cachedGuild) {
      systemChannel?.send("Hey good to see you again guys");
      this.client.cacheManager.guilds.set(cachedGuild.id, cachedGuild);
      return console.log("Guild exists:", cachedGuild.id);
    }

    systemChannel?.send("Hey I'm new here");

    const newGuild = this.guildRepository.create({
        id,
        name,
      }),
      savedGuild = await this.guildRepository.save(newGuild);

    this.client.cacheManager.guilds.set(savedGuild.id, savedGuild);
    console.log("Guild saved:", savedGuild.id);
  }
}

export default GuildCreateEvent;
