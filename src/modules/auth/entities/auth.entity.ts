import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Admin } from '../../admin/entities/admin.entity';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' }) // Either 'user' or 'admin'
  role: string;

  @OneToOne(() => User, (user) => user.auth, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int', nullable: true }) // Ensure adminId is stored
  userId: number;

  @OneToOne(() => Admin, (admin) => admin.auth, { nullable: true })
  @JoinColumn({ name: 'adminId' })
  admin: Admin;

  @Column({ type: 'int', nullable: true }) // Ensure adminId is stored
  adminId: number;

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
