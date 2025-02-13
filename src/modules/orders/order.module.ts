import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Grocery } from '../grocery/entities/grocery.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Admin } from '../admin/entities/admin.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Grocery, Admin, User]),
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, JwtAuthGuard],
  exports: [OrderService],
})
export class OrderModule {}
