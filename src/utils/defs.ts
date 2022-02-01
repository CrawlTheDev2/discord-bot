import DiscordBot from "@/DiscordBot";
import Constants from "@utils/constants";
import { Message } from "discord.js";
import { getRepository, Repository } from "typeorm";
import { Deps } from "./deps";
import { CommandLogEntity } from "./typeorm/entities/CommandLogEntity";
import { GuildEntity } from "./typeorm/entities/GuildEntity";

export abstract class BaseEvent {
  constructor(private _on: string, private _enabled: boolean = true) {}

  abstract handle(...args: any): any;

  get on(): string {
    return this._on;
  }

  get enabled(): boolean {
    return this._enabled;
  }
}

export class CommandContext {
  constructor(
    private _client = Deps.get<DiscordBot>(DiscordBot),
    private _guildsRepository = getRepository(GuildEntity),
    private _commandLogsRepository = getRepository(CommandLogEntity),
  ) {}

  get client(): DiscordBot {
    return this._client;
  }

  get guildsRepository(): Repository<GuildEntity> {
    return this._guildsRepository;
  }

  get commandLogsRepository(): Repository<CommandLogEntity> {
    return this._commandLogsRepository;
  }

  get cache(): ClientCache {
    return this._client.cache;
  }
}

export abstract class BaseCommand {
  constructor(private _name: string, private _enabled: boolean = true) {}

  abstract handle(context: CommandContext, msg: Message, ...args: any): any;

  get name(): string {
    return this._name;
  }

  get enabled(): boolean {
    return this._enabled;
  }
}

export interface Constants {}

export interface ClientCache {
  guilds: Map<string, GuildEntity>;
  logs: LogsCache;
}

export interface LogsCache {
  commandLogs: Map<string, CommandLogEntity>;
}
