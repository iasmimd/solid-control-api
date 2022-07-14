import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  number: number;

  @Column('varchar', { length: 256, nullable: false })
  street: string;

  @Column('varchar', { length: 256 })
  complement: string;

  @Column('varchar', { length: 2, nullable: false })
  state: string;

  @Column({ nullable: false })
  zip_code: number;

  @Column('varchar', { length: 2, nullable: false })
  country: string;

  @ManyToMany(() => User)
  @JoinTable()
  user_id: User[];

  constructor() {
    if ('this.id') {
      this.id = uuid();
    }
  }
}
