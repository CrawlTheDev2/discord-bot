import { BaseEvent } from "@utils/defs";
import { Constants, Message, TextChannel } from "discord.js";

class MessageDeleteEvent extends BaseEvent {
  constructor() {
    super(Constants.Events.MESSAGE_DELETE);
  }

  async handle(msg: Message) {
    const logChannel = msg.guild?.channels.cache.find(
      (c) => c.name === "audit-logs",
    ) as TextChannel | undefined;

    const fetchedLogs = await msg.guild?.fetchAuditLogs({
      limit: 1,
      type: "MESSAGE_DELETE",
    });

    const deletionLog = fetchedLogs?.entries.first();
    const notFoundMsg = `A message by ${msg.author.tag} was deleted. but we don't know by who.`;

    if (!deletionLog) return await logChannel?.send(notFoundMsg);

    const { executor, target } = deletionLog;

    if (target.id === msg.author.id)
      await logChannel?.send(
        `A message by ${msg.author.tag} was deleted by ${executor?.tag}.`,
      );
    else await logChannel?.send(notFoundMsg);
  }
}

export default MessageDeleteEvent;
