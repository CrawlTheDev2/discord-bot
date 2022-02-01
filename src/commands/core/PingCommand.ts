import { Definetions } from "@/utils";
import { Message } from "discord.js";

class PingCommand extends Definetions.BaseCommand {
  constructor() {
    super("ping", {
      enabled: true,
    });
  }

  async handle(context: Definetions.CommandContext, msg: Message) {
    console.log(context.client.user);

    await msg.reply("Ping command works fine:!");
  }
}

export default PingCommand;
