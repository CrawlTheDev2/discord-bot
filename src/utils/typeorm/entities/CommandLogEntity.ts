import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("command_logs")
export class CommandLogEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: "simple-json" })
  guild: {
    id: string;
    name: string;
  };

  @Column({ type: "simple-json" })
  executor: {
    id: string;
    name: string;
  };

  @Column({ name: "executed_at" })
  executedAt: Date;
}
