import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseHandler } from '../../response-handler/response';
import { Message } from '../../response-handler/message';
import { Language } from '../../common/enums/language';

@ApiTags('Users') // Groups all user-related endpoints under "Users"
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.createUser(createUserDto);
    return ResponseHandler.init(
      HttpStatus.OK,
      Message.API_SUCCESS[Language.EN],
      data,
    );
  }
}
