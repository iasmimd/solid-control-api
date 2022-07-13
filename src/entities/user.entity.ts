import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Address } from "./address.entity";
import { Cart } from "./cart.entity";
import { Ticket } from "./ticket.entity";



@Entity("users")
@Unique(["email"])
class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 128, nullable: false})
    name: string

    @Column({length: 256, nullable: false})
    email: string

    @Column({length: 128, nullable: false})
    password: string

    @Column({default: false})
    adm: boolean

    /* MUITOS User PODEM TER MUITOS Address*/
    @ManyToMany(() => Address, {eager: true})
    @JoinTable()
    address: Address[]
    

    /* CADA User SÓ TEM UM Cart (1:1)*/
    @OneToOne(() => Cart,{eager: true})
    @JoinColumn()
    cart: Cart
    

    /* */
    @ManyToMany(() => Ticket, {eager: true})
    @JoinTable()
    tickets: Ticket[]
    

}
export { User }