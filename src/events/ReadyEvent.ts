import { Constants } from "discord.js";

import { Definetions, Deps } from "@/utils";
import DiscordBot from "@/DiscordBot";

class ReadyEvent extends Definetions.BaseEvent {
  constructor(private client = Deps.get<DiscordBot>(DiscordBot)) {
    super(Constants.Events.CLIENT_READY);
  }

  async handle() {
    this.client.setPresence([{ name: "something" }]);
    console.log("Signed in as " + this.client.user?.tag);

    //     const statusEmbed = new MessageEmbed({
    //       title: "Client is Live!",
    //       description: "Some stats of the bot are shown below",
    //       thumbnail: {
    //         url: this.client.user?.avatarURL() ?? "",
    //       },
    //       fields: [
    //         {
    //           name: "Unchace/Cache",
    //           value: `
    // \`${this.client.users.cache.size}\` users *(0 cached)*
    // \`${this.client.guilds.cache.size}\` guilds *(0 cached)*
    // \`${this.client.events.size}\` events *(0 cached)*
    //           `,
    //         },
    //         {
    //           name: "Database",
    //           value: `
    // Connection 1: \`Up\` *(0 ms)*
    // Connection 2: \`Down\` *(failure)*
    // Connection 3: \`Down\` *(failure)*
    //           `,
    //         },
    //       ],
    //       footer: {
    //         icon_url: this.client.user?.avatarURL() ?? "",
    //         text: "Current Name: " + this.client.user?.tag.toString()!,
    //       },
    //       timestamp: new Date().toLocaleString(),
    //     }).setColor("GREEN");
  }
}

export default ReadyEvent;
