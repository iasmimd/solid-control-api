import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => User, (user) => user.cart)
  cart: User;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;
}
