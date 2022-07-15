import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./orders.entity";
import { Providers } from "./providers.entity";

@Entity()
export class Supply {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 256, nullable: false })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  buy_price: number;

  @Column({ default: null })
  @Exclude()
  qtd?: number;
  @ManyToMany(() => Providers, { eager: true })
  @JoinTable()
  provider: Providers[];

  @ManyToMany(() => Orders)
  @JoinTable()
  orders: Orders[];
}
