import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExpressRequest } from '../types/expressRequest.interface'; // Custom request type
import { User } from '../modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async getUser(authId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { authId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = await this.validateToken(token);
    request.user = decoded;
    if (decoded.role === 'user') {
      const userDetail = await this.getUser(decoded.id);
      request.user.userId = userDetail.id;
    }
    return true;
  }
}
