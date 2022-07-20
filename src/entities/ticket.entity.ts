import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';
import { User } from './user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column("float")
  total: number
  @Column()
  status:string
  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @ManyToMany(() => Product, {
    eager: true,
  })
  
  @JoinTable()
  products: Product[];
}
