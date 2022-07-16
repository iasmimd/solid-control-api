import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Supply } from "./supply.entity";

@Entity()
export class Stock {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  qtd: number;

  @ManyToOne(() => Supply, (supply) => supply.id, { eager: true })
  @JoinColumn()
  supply: Supply;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
