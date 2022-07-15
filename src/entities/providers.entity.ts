import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Orders } from "./orders.entity";

@Entity()
export class Providers {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("varchar", { length: 256, nullable: false })
  fantasy_name: string;

  @Column("varchar", { length: 256, nullable: false })
  name: string;

  @Column("varchar", { length: 14, nullable: false })
  cnpj: string;

  @Column("varchar", { length: 9, nullable: false })
  ie: string;

  @Column("varchar", { length: 256, nullable: false })
  street: string;

  @Column()
  number: number;

  @Column("varchar", { length: 256, nullable: true })
  complement: string;

  @Column("varchar", { length: 256, nullable: false })
  district: string;

  @Column("varchar", { length: 256, nullable: false })
  city: string;

  @Column("varchar", { length: 2, nullable: false })
  state: string;

  @Column("varchar", { length: 256, nullable: false })
  country: string;

  @Column("varchar", { length: 10, nullable: false })
  zip_code: string;



}
