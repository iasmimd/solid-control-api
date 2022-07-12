import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Exclude } from "class-transformer";
//import { Address } from "./address.entity.ts";
//import { Cart } from "./cart.entity.ts";
//import { Tickets } from "./tickets.entity.ts";

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
    @Exclude()
    password: string

    @Column({default: false})
    isAdm: boolean

    /* MUITOS User PODEM TER MUITOS Address
    @ManyToMany(() => Address, {eager: true})
    @JoinTable()
    address: Address[]
    */

    /* CADA User SÓ TEM UM Cart (1:1)
    @Column((type) => Cart, {eager: true})
    @JoinColumn()
    cart: Cart[]
    */

    /* 
    @ManyToMany(() => Tickets, {eager: true})
    @JoinTable()
    tickets: Tickets[]
    */

}
export { User }