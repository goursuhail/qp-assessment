import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @OneToOne(() => Auth, (auth) => auth.user, { cascade: true })
  @JoinColumn({ name: 'authId' })
  auth: Auth;

  @Column({ type: 'int', nullable: true }) // Ensure authId is stored
  authId: number;

  @Column({ type: 'boolean', default: false })
  isDeactivated: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
