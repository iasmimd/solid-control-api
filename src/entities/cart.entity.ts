import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  subtotal: number;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products: Product[];
}
