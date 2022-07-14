import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Providers } from "./providers.entity";

@Entity()
export class Supply {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 256, nullable: false })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  buy_price: number;

 @ManyToMany(()=> Providers,provider => provider.id,{eager:true})
 @JoinTable()
 provider_id: Providers

//  @ManyToMany(()=> Order, order=> order.id)
//  @JoinTable()
//  order_id: Order
}
