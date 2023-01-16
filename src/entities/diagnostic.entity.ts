import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./user.entity";
import { UsersMedic } from "./usermedic.entity";

@Entity("diagnostic")
class Diagnostic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Users, (user) => user.diagnostic, { nullable: false })
  user: Users;

  @ManyToOne(() => UsersMedic, (userMedic) => userMedic.diagnostic, {
    nullable: false,
  })
  medic: UsersMedic;
}

export { Diagnostic };
