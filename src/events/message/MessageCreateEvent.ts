import { Constants, Message, TextChannel } from "discord.js";
import { BaseEvent, CommandContext } from "@utils/defs";
import { Deps } from "@utils/deps";
import DiscordBot from "@/DiscordBot";

class MessageCreateEvent extends BaseEvent {
  constructor(private client = Deps.get<DiscordBot>(DiscordBot)) {
    super(Constants.Events.MESSAGE_CREATE);
  }

  async handle(msg: Message) {
    if (msg.author.bot) return;

    this.client.cache.messagesSent++;

    const clientLogChannel = this.client.channels.cache.get(
        this.client.constants.DeveloperLogChannels.COMMAND_EXECUTIONS,
      ) as TextChannel | undefined,
      prefix = this.client.configs.Client.PREFIX;

    if (msg.content.startsWith(prefix)) {
      const [command, ...commandArgs] = msg.content
          .toLowerCase()
          .slice(prefix.length)
          .trim()
          .split(/\s+/),
        cmd = this.client.commands.get(command);

      if (cmd) {
        await cmd.handle(new CommandContext(), msg, commandArgs);

        this.client.cache.commandsExecuted++;

        await clientLogChannel?.send(
          `Command '${command}' executed by ${msg.author.tag}.`,
        );
      }
    }
  }
}

export default MessageCreateEvent;
