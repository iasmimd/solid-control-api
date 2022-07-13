import { Column, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export class Cart {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default: 0})
    subtotal: number 

    // @ManyToMany(() => Product, { eager: true })
    // @JoinTable()
    // products: Product[];
}