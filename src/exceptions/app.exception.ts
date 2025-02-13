import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Utils } from '../utils/utils';
import { ExceptionCodes, ExceptionCodeDetails } from './exception-codes';

const objectOrError = {};

export class AppException extends HttpException {
  @ApiProperty({ enum: ExceptionCodes, description: 'Error Code' })
  code: ExceptionCodes;

  @ApiProperty({ example: {}, description: 'Error Context' })
  context: Record<string, any> = {};

  @ApiProperty({ example: '', description: 'Message' })
  message: string;

  constructor(
    code: ExceptionCodes,
    status?: number,
    variables?: Record<string, number | string>,
  ) {
    super(Utils.compile(ExceptionCodeDetails[code], variables), status);

    this.code = code;
  }

  addContext(ctx: Record<string, any>) {
    this.context = Object.assign(this.context, ctx);

    return this;
  }
  toJson() {
    return {
      statusCode: this.getStatus(),
      status: false,
      message: this.context.message,
    };
  }
}

/**
 * @description
 * This error should be thrown when some unexpected and exceptional case is encountered.
 *
 */
export class InternalServerException extends AppException {
  @ApiProperty({ example: ExceptionCodes.INTERNAL_SERVER_ERROR })
  code: ExceptionCodes;

  @ApiProperty({ example: ExceptionCodeDetails.INTERNAL_SERVER_ERROR })
  message: string;

  constructor() {
    super(
      ExceptionCodes.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class UnknownException extends AppException {
  constructor(status: HttpStatus) {
    super(ExceptionCodes.UNKNOWN_ERROR, status);
  }
}

export class UnprocessibleEntity extends AppException {
  constructor(status: HttpStatus) {
    super(ExceptionCodes.UNPROCESSIBLE_ENTITY, status);
  }
}

export class BadRequestException extends HttpException {
  constructor(message?: string | any) {
    objectOrError['message'] = message;
    objectOrError['statusCode'] = HttpStatus.BAD_REQUEST;
    objectOrError['status'] = false;
    super(objectOrError, HttpStatus.BAD_REQUEST);
  }
}

export class TooManyRequestException extends HttpException {
  constructor(message?: string | any) {
    objectOrError['message'] = message;
    objectOrError['statusCode'] = HttpStatus.TOO_MANY_REQUESTS;
    objectOrError['status'] = false;
    super(objectOrError, HttpStatus.TOO_MANY_REQUESTS);
  }
}

export class PaymentRequiredException extends HttpException {
  constructor(message?: string | any) {
    objectOrError['message'] = message;
    objectOrError['statusCode'] = HttpStatus.PAYMENT_REQUIRED;
    objectOrError['status'] = false;
    super(objectOrError, HttpStatus.PAYMENT_REQUIRED);
  }
}

export class NotFoundException extends HttpException {
  constructor(message?: string | any) {
    objectOrError['message'] = message;
    objectOrError['statusCode'] = HttpStatus.NOT_FOUND;
    objectOrError['status'] = false;
    super(objectOrError, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message?: string | any) {
    objectOrError['message'] = message;
    objectOrError['statusCode'] = HttpStatus.UNAUTHORIZED;
    objectOrError['status'] = false;
    super(objectOrError, HttpStatus.UNAUTHORIZED);
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message?: string | any) {
    objectOrError['message'] = message;
    objectOrError['statusCode'] = HttpStatus.UNPROCESSABLE_ENTITY;
    objectOrError['status'] = false;
    super(objectOrError, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message?: string | any) {
    objectOrError['message'] = message;
    objectOrError['statusCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
    objectOrError['status'] = false;
    super(objectOrError, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
