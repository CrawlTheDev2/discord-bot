import { BaseCommand, CommandContext } from "@/utils/defs";
import { Message, MessageEmbed } from "discord.js";

class StatisticsCommand extends BaseCommand {
  constructor() {
    super("stats");
  }

  async handle(context: CommandContext, msg: Message) {
    const statsEmbed = new MessageEmbed({
      title: "Statistics",
      description: "Some stats of the bot are shown below",
      thumbnail: {
        url: context.client.user?.avatarURL() ?? "",
      },
      fields: [
        {
          name: "Client",
          value: `
\`${context.client.cache.commandsExecuted + 1}\` commands executed today
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

export default StatisticsCommand;
