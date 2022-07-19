import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Cart } from './cart.entity';
import { Ticket } from './ticket.entity';

@Entity()
@Unique(["email"])
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('varchar',{ length: 128, nullable: false, })
  name: string;

  @Column('varchar',{ length: 256, nullable: false })
  email: string;

  @Column('varchar',{ length: 128, nullable: false })
  @Exclude()
  password: string;

  @Column({ default: false })
  isAdm?: boolean;

  @Column({ default: true })
  @Exclude()
  active: boolean;

  @Column()
  number: string;

  @Column( 'varchar',{ length: 256, nullable: false })
  street: string;

  @Column('varchar', { length: 256 })
  complement: string;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column( { length: 2, nullable: false })
  state: string;

  @Column()
  zip_code: string;

  @Column( { length: 256, nullable: false })
  country: string;

  @OneToOne(() => Cart, { eager: true })
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
export { User };
