import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default: 0})
    subtotal: number 

    // @ManyToMany(() => Product, { eager: true })
    // @JoinTable()
    // products: Product[];
}