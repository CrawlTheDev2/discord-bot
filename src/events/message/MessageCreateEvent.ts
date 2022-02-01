import { Constants, Message } from "discord.js";
import { BaseEvent, CommandContext } from "@utils/defs";
import { Deps } from "@utils/deps";
import DiscordBot from "@/DiscordBot";
import { getRepository } from "typeorm";
import { CommandLogEntity } from "@utils/typeorm/entities/CommandLogEntity";

class MessageCreateEvent extends BaseEvent {
  constructor(
    private client = Deps.get<DiscordBot>(DiscordBot),
    private commandLogsRepository = getRepository(CommandLogEntity),
  ) {
    super(Constants.Events.MESSAGE_CREATE);
  }

  async handle(msg: Message) {
    if (!msg.guild || msg.author.bot) return;

    const guild = this.client.cache.guilds.get(msg.guild.id);

    if (!guild) return await msg.reply("Guild configuration not found.");

    const prefix = guild.prefix;

    if (msg.content.startsWith(prefix)) {
      const [command, ...commandArgs] = msg.content
          .toLowerCase()
          .slice(prefix.length)
          .trim()
          .split(/\s+/),
        cmd = this.client.commands.get(command);

      if (cmd) {
        await cmd.handle(new CommandContext(), msg, commandArgs);

        const newCommandLog = this.commandLogsRepository.create({
            name: cmd.name,
            guild: {
              id: msg.guild.id,
              name: msg.guild.name,
            },
            executor: {
              id: msg.author.id,
              name: msg.author.username,
            },
            executedAt: new Date(),
          }),
          savedCommandLog = await this.commandLogsRepository.save(newCommandLog);
        this.client.cache.logs.commandLogs.set(savedCommandLog.id, savedCommandLog);
      }
    }
  }
}

export default MessageCreateEvent;
