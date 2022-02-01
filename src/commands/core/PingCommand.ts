import { BaseCommand, CommandContext } from "@utils/defs";
import { Message } from "discord.js";

class PingCommand extends BaseCommand {
  constructor() {
    super("ping", {
      enabled: true,
    });
  }

  async handle(context: CommandContext, msg: Message) {
    console.log(context.client.user);

    await msg.reply("Ping command works fine:!");
  }
}

export default PingCommand;
