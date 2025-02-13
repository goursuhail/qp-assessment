import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/order.dto';
import { Grocery } from '../grocery/entities/grocery.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Grocery) private groceryRepository: Repository<Grocery>,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    currentUser: any,
  ): Promise<Order> {
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item.');
    }

    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    for (const item of createOrderDto.items) {
      const grocery = await this.groceryRepository.findOne({
        where: { id: item.groceryId, isDeleted: false },
      });

      if (!grocery) {
        throw new BadRequestException(
          `Grocery item with ID ${item.groceryId} not found.`,
        );
      }

      if (grocery.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for ${grocery.name}.`,
        );
      }

      grocery.stock -= item.quantity; // Reduce stock
      await this.groceryRepository.save(grocery);

      totalPrice += grocery.price * item.quantity;

      const orderItem = this.orderItemRepository.create({
        grocery,
        quantity: item.quantity,
        price: grocery.price * item.quantity,
      });

      orderItems.push(orderItem);
    }

    const order = this.orderRepository.create({
      userId: currentUser.userId,
      items: orderItems,
      totalPrice,
    });

    return await this.orderRepository.save(order);
  }

  async findAll(currentUser: any): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { userId: currentUser.userId },
      relations: ['items', 'items.grocery'],
    });
  }
}
