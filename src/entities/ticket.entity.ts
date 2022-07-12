import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => User, (user) => user.cart)
  cart: User;
}
