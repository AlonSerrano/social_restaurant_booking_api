import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Table } from "./Table";
import { Diner } from "./Diner";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("timestamp")
  time!: Date;

  @ManyToOne(() => Table, (table) => table.reservations)
  table!: Table;

  @ManyToMany(() => Diner, (diner) => diner.reservations)
  @JoinTable()
  diners!: Diner[];
}
