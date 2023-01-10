import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("speciality")
class Speciality {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
}

export { Speciality };
