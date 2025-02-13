import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { CreateGroceryDto, UpdateGroceryDto } from './dto/grocery.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AdminGuard } from '../../guards/admin.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseHandler } from '../../response-handler/response';
import { Message } from '../../response-handler/message';
import { Language } from '../../common/enums/language';
import { AuthUserProvider } from '../../decorators/auth-user.decorator';

@ApiTags('Groceries')
@ApiBearerAuth() // Requires JWT Authentication
@Controller('groceries')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Post()
  @UseGuards(AdminGuard) // Only Admins can create groceries
  @ApiOperation({ summary: 'Create a new grocery item (Admin only)' })
  async create(
    @Body() createGroceryDto: CreateGroceryDto,
    @AuthUserProvider() currentUser: any,
  ) {
    await this.groceryService.create(createGroceryDto, currentUser);
    return ResponseHandler.init(
      HttpStatus.OK,
      Message.GROCERY_CREATED_SUCCESSFULLY[Language.EN],
      [],
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all grocery items' })
  async findAll() {
    const data = await this.groceryService.findAll();
    return ResponseHandler.init(
      HttpStatus.OK,
      Message.API_SUCCESS[Language.EN],
      data,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a grocery item by ID' })
  async findOne(@Param('id') id: number) {
    const data = await this.groceryService.findOne(id);
    return ResponseHandler.init(
      HttpStatus.OK,
      Message.API_SUCCESS[Language.EN],
      data,
    );
  }

  @Patch(':id')
  @UseGuards(AdminGuard) // Only Admins can update groceries
  @ApiOperation({ summary: 'Update a grocery item (Admin only)' })
  async update(
    @Param('id') id: number,
    @Body() updateGroceryDto: UpdateGroceryDto,
  ) {
    const data = await this.groceryService.update(id, updateGroceryDto);
    return ResponseHandler.init(
      HttpStatus.OK,
      Message.API_SUCCESS[Language.EN],
      data,
    );
  }

  @Delete(':id')
  @UseGuards(AdminGuard) // Only Admins can delete groceries
  @ApiOperation({ summary: 'Delete a grocery item (Admin only)' })
  async remove(@Param('id') id: number) {
    await this.groceryService.remove(id);
    return ResponseHandler.init(
      HttpStatus.OK,
      Message.API_SUCCESS[Language.EN],
      [],
    );
  }
}
