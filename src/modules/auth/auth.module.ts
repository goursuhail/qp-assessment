import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './entities/auth.entity';
import { Token } from './entities/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../guards/jwt.strategy';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, Token, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard, JwtModule], // Export for use in other modules
})
export class AuthModule {}
