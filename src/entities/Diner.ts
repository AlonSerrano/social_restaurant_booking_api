import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Reservation } from "./Reservation";

@Entity()
export class Diner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text", { array: true })
  restrictions!: string[];

  @ManyToMany(() => Reservation, (reservation) => reservation.diners)
  reservations!: Reservation[];

  @Column("varchar", { nullable: true })
  homeLocation!: string | null;
}
