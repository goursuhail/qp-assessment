import { IsInt, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ example: 1, description: 'ID of the grocery item' })
  @IsInt()
  groceryId: number;

  @ApiProperty({ example: 2, description: 'Quantity of the grocery item' })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    example: [
      { groceryId: 1, quantity: 2 },
      { groceryId: 3, quantity: 1 },
    ],
    description: 'List of grocery items to order',
    type: [OrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
