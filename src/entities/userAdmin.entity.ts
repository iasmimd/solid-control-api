import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
@Unique(['email'])
class AdminUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 128, nullable: false })
  name: string;

  @Column('varchar', { length: 256, nullable: false })
  email: string;

  @Column('varchar', { length: 256, nullable: false })
  password: string;

  @Column()
  isAdm?: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { AdminUser };
