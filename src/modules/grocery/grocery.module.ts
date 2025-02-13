import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grocery } from './entities/grocery.entity';
import { GroceryService } from './grocery.service';
import { GroceryController } from './grocery.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grocery, User]), AuthModule], // Register the Grocery entity
  controllers: [GroceryController], // Controller for handling HTTP requests
  providers: [GroceryService], // Service for business logic
  exports: [GroceryService], // Export service if needed in other modules
})
export class GroceryModule {}
