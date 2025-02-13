import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Auth } from '../auth/entities/auth.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '../../exceptions/app.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, address, email, password } = createUserDto;
    // Check if auth record already exists
    const existingAuth = await this.authRepository.findOne({
      where: { email },
    });
    if (existingAuth) {
      throw new BadRequestException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create Auth record
    const auth = this.authRepository.create({
      email,
      password: hashedPassword,
      role: 'user',
    });
    await this.authRepository.save(auth);

    // Create User record
    const user = this.userRepository.create({
      firstName,
      lastName,
      address,
      auth,
    });

    return await this.userRepository.save(user);
  }
}
