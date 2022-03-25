import { Constants, Message } from "discord.js";

import DiscordBot from "@/DiscordBot";
import { Definetions, Deps } from "@/utils";

class MessageCreateEvent extends Definetions.BaseEvent {
  constructor(private client = Deps.get<DiscordBot>(DiscordBot)) {
    super(Constants.Events.MESSAGE_CREATE);
  }

  async handle(msg: Message) {
    if (!msg.guild || msg.author.bot) return;

    const guild = this.client.cacheManager.guilds.get(msg.guild.id);

    if (!guild) return msg.reply("Guild configuration not found.");

    const prefix = guild.prefix;

    if (msg.content.startsWith(prefix)) {
      const [command, ...commandArgs] = msg.content
          .toLowerCase()
          .slice(prefix.length)
          .trim()
          .split(/\s+/),
        cmd = this.client.cacheManager.commands.get(command);

      if (!cmd) return;
      if (cmd.options.onlyStaff && !this.client.configs.Client.OWNERS.includes(msg.author.id))
        return msg.reply("You are not Staff.");

      cmd.handle(new Definetions.CommandContext(), msg, commandArgs);
    }
  }
}

export default MessageCreateEvent;
