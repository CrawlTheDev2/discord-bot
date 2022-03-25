import { BaseCommand, CommandContext } from "@/utils";
import { Message, MessageEmbed } from "discord.js";

class BotInformationCommand extends BaseCommand {
  constructor() {
    super({
      name: "BOT_INFORMATION",
      enabled: true,
      onlyStaff: true
    });
  }

  async handle(ctx: CommandContext, msg: Message) {
    const statsEmbed = new MessageEmbed({
      title: "Bot Information",
      description: "Some info of the bot are shown below",
      thumbnail: {
        url: ctx.client.user?.avatarURL() ?? ""
      },
      fields: [
        {
          name: "Client",
          value: `Uptime: \`${Math.round(
            process.uptime() / 60
          )}\` minutes *(%90 accuracy)*`
        }
      ],
      footer: {
        icon_url: msg.author.avatarURL() ?? "",
        text: msg.author.tag
      },
      timestamp: new Date().toLocaleString()
    });

    await msg.reply({ embeds: [statsEmbed] });
  }
}

export default BotInformationCommand;
