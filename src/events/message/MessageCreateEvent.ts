import { Constants, Message, TextChannel } from "discord.js";
import { BaseEvent, CommandContext } from "@utils/defs";
import { Deps } from "@/utils/deps";
import DiscordBot from "@/DiscordBot";

class MessageCreateEvent extends BaseEvent {
  constructor(private client = Deps.get<DiscordBot>(DiscordBot)) {
    super(Constants.Events.MESSAGE_CREATE);
  }

  async handle(msg: Message) {
    if (msg.author.bot) return;

    const clientLogChannel = this.client.channels.cache.get(
      this.client.constants.DeveloperLogChannels.COMMAND_EXECUTIONS,
    ) as TextChannel | undefined;
    const prefix = this.client.configs.Client.PREFIX;

    if (msg.content.startsWith(prefix)) {
      const [command, ...commandArgs] = msg.content
        .toLowerCase()
        .slice(prefix.length)
        .trim()
        .split(/\s+/);

      //       await msg.reply(`
      // \`\`\`ts
      // Command {
      //   name: '${command}',
      //   args: [${commandArgs}],
      //   timestamp: '${new Date().toLocaleString()}',
      //   author: {
      //     id: '${msg.author.id}',
      //     tag: '${msg.author.tag}'
      //   }
      // }
      // \`\`\`
      // `);

      const cmd = this.client.commands.get(command);

      if (cmd) {
        const commandContext = new CommandContext();
        await cmd.handle(commandContext, msg, commandArgs);
        this.client.cache.commandsExecuted++;
        await clientLogChannel?.send(
          `Command '${command}' executed by ${msg.author.tag}.`,
        );
      }
    }
  }
}

export default MessageCreateEvent;
