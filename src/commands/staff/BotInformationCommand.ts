import { BaseCommand, CommandContext } from "@utils/defs";
import { Message, MessageEmbed } from "discord.js";

class BotInformationCommand extends BaseCommand {
  constructor() {
    super("bot-info");
  }

  async handle(context: CommandContext, msg: Message) {
    const commandLogs = await context.cache.logs.commandLogs;

    const statsEmbed = new MessageEmbed({
      title: "Bot Information",
      description: "Some info of the bot are shown below",
      thumbnail: {
        url: context.client.user?.avatarURL() ?? "",
      },
      fields: [
        {
          name: "Client",
          value: `
Uptime: \`${Math.round(process.uptime() / 60)}\` minutes *(%90 accuracy)*

\`${commandLogs.size + 1}\` commands executed *(total)*
`,
        },
      ],
      footer: {
        icon_url: msg.author.avatarURL() ?? "",
        text: msg.author.tag,
      },
      timestamp: new Date().toLocaleString(),
    });

    await msg.reply({ embeds: [statsEmbed] });
  }
}

export default BotInformationCommand;
