import DiscordBot from "@/DiscordBot";
import Constants from "@utils/constants";
import { Message } from "discord.js";
import { Deps } from "./deps";

export abstract class BaseEvent {
  constructor(
    private _on: string,
    private _enabled: boolean = true,
  ) {}

  abstract handle(...args: any): any;

  get on(): string {
    return this._on;
  }

  get enabled(): boolean {
    return this._enabled;
  }
}

export class CommandContext {
  constructor(private _client = Deps.get<DiscordBot>(DiscordBot)) {}

  get client(): DiscordBot {
    return this._client;
  }
}

export abstract class BaseCommand {
  constructor(
    private _name: string,
    private _enabled: boolean = true,
  ) {}

  abstract handle(
    context: CommandContext,
    msg: Message,
    ...args: any
  ): any;

  get name(): string {
    return this._name;
  }

  get enabled(): boolean {
    return this._enabled;
  }
}

export interface Constants {
  LogChannel: typeof Constants.DeveloperLogChannels;
}
