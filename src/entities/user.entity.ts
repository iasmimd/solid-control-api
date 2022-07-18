import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  ManyToMany,
  JoinColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Address } from './address.entity';
import { Cart } from './cart.entity';
import { Ticket } from './ticket.entity';

@Entity()
@Unique(['email'])
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128, nullable: false })
  name: string;

  @Column({ length: 256, nullable: false })
  email: string;

  @Column({ length: 128, nullable: false })
  @Exclude()
  password: string;

  @Column({ default: false })
  isAdm?: boolean;

  @Column({ default: true })
  @Exclude()
  active: boolean;


  @ManyToMany(() => Address, { eager: true })
  @JoinTable()
  address: Address[];


  @OneToOne(() => Cart, { eager: true })
  @JoinColumn()
  cart: Cart;


  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
export { User };
