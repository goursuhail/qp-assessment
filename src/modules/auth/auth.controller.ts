import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ResponseHandler } from '../../response-handler/response';
import { Message } from '../../response-handler/message';
import { Language } from '../../common/enums/language';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and return a JWT token.',
  })
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    return ResponseHandler.init(
      HttpStatus.OK,
      Message.API_SUCCESS[Language.EN],
      data,
    );
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    this.authService.logout(req.user.token);
    return ResponseHandler.init(
      HttpStatus.OK,
      Message.LOGGED_OUT_SUCCESSFULLY[Language.EN],
      [],
    );
  }
}
