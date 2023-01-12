import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_address")
class UserAddress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 5 })
  number: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;
}

export { UserAddress };
