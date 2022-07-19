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
<<<<<<< HEAD
} from "typeorm";
import { Exclude } from "class-transformer";

import { Cart } from "./cart.entity";
import { Ticket } from "./ticket.entity";
=======
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Address } from './address.entity';
import { Cart } from './cart.entity';
import { Ticket } from './ticket.entity';
>>>>>>> refactor/adminLogic

@Entity()
@Unique(["email"])
class User {
  @PrimaryGeneratedColumn("uuid")
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

<<<<<<< HEAD
  @Column()
  number: string;

  @Column( { length: 256, nullable: false })
  street: string;

  @Column( { length: 256 })
  complement: string;
=======
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
>>>>>>> refactor/adminLogic

  @Column( { length: 2, nullable: false })
  state: string;

<<<<<<< HEAD
  @Column()
  zip_code: string;

  @Column( { length: 256, nullable: false })
  country: string;

=======
>>>>>>> refactor/adminLogic
  @OneToOne(() => Cart, { eager: true })
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
export { User };
