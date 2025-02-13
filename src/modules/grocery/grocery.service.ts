import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grocery } from './entities/grocery.entity';
import { CreateGroceryDto, UpdateGroceryDto } from './dto/grocery.dto';
import { BadRequestException } from '../../exceptions/app.exception';

@Injectable()
export class GroceryService {
  constructor(
    @InjectRepository(Grocery)
    private readonly groceryRepository: Repository<Grocery>,
  ) {}

  async create(
    createGroceryDto: CreateGroceryDto,
    currentUser: any,
  ): Promise<Grocery> {
    // Check if grocery name already exists
    const existingGrocery = await this.groceryRepository.findOne({
      where: { name: createGroceryDto.name, isDeleted: false },
    });

    if (existingGrocery) {
      throw new BadRequestException(
        'A grocery item with this name already exists',
      );
    }

    // Assign adminId from the current user
    createGroceryDto.adminId = currentUser.id;
    const grocery = this.groceryRepository.create(createGroceryDto);
    return await this.groceryRepository.save(grocery);
  }

  async findAll(): Promise<Grocery[]> {
    return await this.groceryRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number): Promise<Grocery> {
    const grocery = await this.groceryRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!grocery) {
      throw new NotFoundException(`Grocery item with ID ${id} not found`);
    }
    return grocery;
  }

  async update(
    id: number,
    updateGroceryDto: UpdateGroceryDto,
  ): Promise<Grocery> {
    // Find grocery by ID
    const grocery = await this.groceryRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!grocery) {
      throw new BadRequestException('Grocery not found');
    }

    // Check if the new name already exists (excluding current grocery)
    if (updateGroceryDto.name && updateGroceryDto.name !== grocery.name) {
      const existingGrocery = await this.groceryRepository.findOne({
        where: { name: updateGroceryDto.name },
      });

      if (existingGrocery) {
        throw new BadRequestException(
          'A grocery item with this name already exists',
        );
      }
    }
    // Update and save the grocery
    return await this.groceryRepository.save({
      ...grocery,
      ...updateGroceryDto,
    });
  }

  async remove(id: number): Promise<void> {
    // Find grocery by ID
    const grocery = await this.groceryRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (!grocery) {
      throw new BadRequestException('Grocery not found');
    }

    // Mark as deleted and save
    await this.groceryRepository.save({
      ...grocery,
      isDeactivated: true,
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}
