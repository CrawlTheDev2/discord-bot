import { Message } from "discord.js";

import DiscordBot from "@/DiscordBot";
import { BaseEvent, CommandContext, Deps } from "@/utils";

class MessageCreateEvent extends BaseEvent {
  constructor(private client = Deps.get<DiscordBot>(DiscordBot)) {
    super({
      on: "MESSAGE_CREATE",
      enabled: true
    });
  }

  async handle(msg: Message) {
    if (!msg.guild || msg.author.bot) return;

    const guild = this.client.cacheManager?.guilds.get(msg.guild.id);

    if (!guild) return msg.reply("Guild configuration not found.");

    const prefix = guild.prefix;

    if (msg.content.startsWith(prefix)) {
      const [command, ...commandArgs] = msg.content
          .toLowerCase()
          .slice(prefix.length)
          .trim()
          .split(/\s+/),
        cmd = this.client.cacheManager?.commands.get(command);

      console.log(this.client.cacheManager?.commands);

      if (!cmd) return;

      const isOwner = this.client.configs.Client.OwnerIDs.includes(
        msg.author.id
      );

      if (cmd.options.onlyStaff && !isOwner)
        return msg.reply("You are not a staff.");

      cmd.handle(new CommandContext(), msg, commandArgs);
    }
  }
}

export default MessageCreateEvent;
