import { Constants, MessageEmbed, TextChannel } from "discord.js";
import { BaseEvent } from "@utils/defs";
import { Deps } from "@utils/deps";
import DiscordBot from "@/DiscordBot";

class ReadyEvent extends BaseEvent {
  constructor(private client = Deps.get<DiscordBot>(DiscordBot)) {
    super(Constants.Events.CLIENT_READY);
  }

  async handle() {
    const clientLogChannel = this.client.channels.cache.get(
      this.client.constants.DeveloperLogChannels.STATUS,
    ) as TextChannel | undefined;

    const statusEmbed = new MessageEmbed({
      title: "Client is Live!",
      description: "Some stats of the bot are shown below",
      thumbnail: {
        url: this.client.user?.avatarURL() ?? "",
      },
      fields: [
        {
          name: "Unchace/Cache",
          value: `
\`${this.client.users.cache.size}\` users *(0 cached)*
\`${this.client.guilds.cache.size}\` guilds *(0 cached)*
\`${this.client.events.size}\` events *(0 cached)*    
          `,
        },
        {
          name: "Database",
          value: `
Connection 1: \`Up\` *(0 ms)*
Connection 2: \`Down\` *(failure)*
Connection 3: \`Down\` *(failure)*
          `,
        },
      ],
      footer: {
        icon_url: this.client.user?.avatarURL() ?? "",
        text: "Current Name: " + this.client.user?.tag.toString()!,
      },
      timestamp: new Date().toLocaleString(),
    }).setColor("GREEN");

    await clientLogChannel?.send({ embeds: [statusEmbed] });

    console.log("Signed in as " + this.client.user?.tag);
  }
}

export default ReadyEvent;
