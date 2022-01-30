import { BaseCommand, CommandContext } from "@utils/defs";
import { Message, MessageEmbed } from "discord.js";

class BotInformationCommand extends BaseCommand {
  constructor() {
    super("bot-info");
  }

  async handle(context: CommandContext, msg: Message) {
    const { commandsExecuted, messagesSent } = context.client.cache,
      uptime = Math.round(process.uptime() / 60);

    const statsEmbed = new MessageEmbed({
      title: "Bot Information",
      description: "Some infos of the bot are shown below",
      thumbnail: {
        url: context.client.user?.avatarURL() ?? "",
      },
      fields: [
        {
          name: "Client",
          value: `

Uptime: \`${uptime}\` minutes *(%90 accuracy)*

\`${commandsExecuted + 1}\` commands executed today
\`${messagesSent}\` messages sent today
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
