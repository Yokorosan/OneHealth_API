import { hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./address.entity";
import { ScheduledAppointment } from "./appoitments.entity";
import { Diagnostic } from "./diagnostic.entity";
import { Speciality } from "./speciality.entity";

@Entity("user_medic")
class UsersMedic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 75 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ default: true })
  isWhatsApp: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashpassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToOne(() => Address, {
    nullable: false,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  address: Address;

  @OneToOne(() => Speciality, {
    nullable: false,
  })
  @JoinColumn()
  speciality: Speciality;

  @OneToMany(
    () => ScheduledAppointment,
    (scheduledAppointment) => scheduledAppointment.medic,
    {
      onDelete: "CASCADE",
    }
  )
  appointment: ScheduledAppointment[];

  @OneToMany(() => Diagnostic, (diagnostic) => diagnostic.medic, {
    cascade: ["insert"],
  })
  diagnostic: Diagnostic[];
}

export { UsersMedic };
