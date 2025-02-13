import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateGroceryDto {
  @ApiProperty({ example: 'Apple', description: 'Name of the grocery item' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1.99, description: 'Price of the grocery item' })
  @IsNumber({}, { message: 'Price must be a valid number' }) // Ensure it's a number
  @Type(() => Number) // Convert incoming data to number
  price: number;

  @ApiProperty({
    example: 50,
    description: 'Stock quantity of the grocery item',
  })
  @IsNumber()
  stock: number;

  @IsNumber()
  @IsOptional()
  adminId?: number;
}

export class UpdateGroceryDto {
  @ApiProperty({
    example: 'Milk',
    description: 'Name of the grocery item',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 4.5,
    description: 'Updated price of the grocery item',
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 50,
    description: 'Updated stock quantity',
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;
}
