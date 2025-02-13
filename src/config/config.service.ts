import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
}
