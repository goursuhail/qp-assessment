import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Auth } from '../entities/auth.entity';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: false })
  accessToken: string;

  // Foreign key relation to the Auth table
  @OneToOne(() => Auth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authId' })
  auth: Auth;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
