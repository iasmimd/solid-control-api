import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Providers } from "./providers.entity";
import { v4 as uuid } from 'uuid';

@Entity()

export class Orders {

  @PrimaryGeneratedColumn("uuid")
  id: string 

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total_price: number

  @Column("varchar", { length: 50, nullable: false })
  status: string

  @ManyToMany(() => Supply, { eager: true, nullable: false })
  @JoinTable()
  supplies: Supply[]

  @ManyToMany(() => Providers, { eager:true, nullable: false })
  @JoinTable()
  provider_id: Providers

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

