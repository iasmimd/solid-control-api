import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Providers } from './providers.entity';
import { v4 as uuid } from 'uuid';
import { Supply } from './supply.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @Column('varchar', { length: 50, nullable: false })
  status: string;

  @ManyToMany(() => Supply, { eager: true })
  @JoinTable()
  supplies: Supply[];

  @ManyToOne(() => Providers, { eager: true })
  @JoinColumn()
  provider: Providers;
}
