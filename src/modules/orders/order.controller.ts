import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserGuard } from '../../guards/user.guard';
import { AuthUserProvider } from '../../decorators/auth-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ResponseHandler } from '../../response-handler/response';
import { Message } from '../../response-handler/message';
import { Language } from '../../common/enums/language';

@ApiTags('Orders') // Group in Swagger
@ApiBearerAuth() // Add Bearer Token Auth in Swagger
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(UserGuard) // Only Users can order grocery
  @ApiOperation({ summary: 'Create a new order' })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @AuthUserProvider() currentUser: any,
  ) {
    await this.orderService.create(createOrderDto, currentUser);
    return ResponseHandler.init(
      HttpStatus.OK,
      Message.API_SUCCESS[Language.EN],
      [],
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders for the logged-in user' })
  async findAll(@AuthUserProvider() currentUser: any) {
    const data = await this.orderService.findAll(currentUser);
    return ResponseHandler.init(
      HttpStatus.OK,
      Message.API_SUCCESS[Language.EN],
      data,
    );
  }
}
