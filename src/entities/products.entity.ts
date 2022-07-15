import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Supply } from './supply.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @Column()
  img: string;
  @ManyToMany(() => Supply, { eager: true })
  @JoinTable()
  supplies: Supply[];
}
