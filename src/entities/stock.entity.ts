import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Stock {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  qtd: number;

  @ManyToOne(() => Supply, (supply) => supply.id)
  supply_id: Supply;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
