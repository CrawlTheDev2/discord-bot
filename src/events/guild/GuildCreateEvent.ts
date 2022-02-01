import { Constants, Guild } from "discord.js";
import { BaseEvent } from "@utils/defs";
import { getRepository } from "typeorm";
import { GuildEntity } from "@utils/typeorm/entities/GuildEntity";
import { Deps } from "@/utils/deps";
import DiscordBot from "@/DiscordBot";

class ReadyEvent extends BaseEvent {
  constructor(
    private client = Deps.get<DiscordBot>(DiscordBot),
    private guildRepository = getRepository(GuildEntity),
  ) {
    super(Constants.Events.GUILD_CREATE);
  }

  async handle(guild: Guild) {
    const guildExists = await this.guildRepository.findOne(guild.id);

    if (guildExists) {
      await guild.systemChannel?.send("Hey good to see you again guys");
      this.client.cache.guilds.set(guildExists.id, guildExists);
      return console.log("Guild exists:", guildExists.id);
    }

    await guild.systemChannel?.send("Hey I'm new here");

    const newGuild = this.guildRepository.create({
        id: guild.id,
        name: guild.name,
      }),
      savedGuild = await this.guildRepository.save(newGuild);

    this.client.cache.guilds.set(savedGuild.id, savedGuild);

    console.log("Guild saved:", savedGuild.id);
  }
}

export default ReadyEvent;
