import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { Auth } from '../auth/entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async createAdmin(): Promise<boolean | Admin> {
    // Check if an admin already exists
    const adminCount = await this.adminRepository.count();
    if (adminCount > 0) {
      return true; // Admin already exists, return true
    }

    // Create Auth record
    const auth = this.authRepository.create({
      email: 'admin@test.com',
      password: await bcrypt.hash('secureAdmin', 10),
      role: 'admin',
    });
    await this.authRepository.save(auth);

    // Create Admin record
    const admin = this.adminRepository.create({
      firstName: 'Admin',
      department: 'Management',
      auth,
    });

    return await this.adminRepository.save(admin);
  }
}
