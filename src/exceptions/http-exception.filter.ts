import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';
import {
  AppException,
  InternalServerException,
  UnknownException,
  UnprocessibleEntity,
} from './app.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof AppException) {
      console.log(exception.stack);
      return response.status(exception.getStatus()).json(exception.toJson());
    }

    if (exception instanceof HttpException) {
      console.log(exception);
      let httpException;
      if (exception.getStatus() == 422) {
        httpException = new UnprocessibleEntity(exception.getStatus());
      } else {
        httpException = new UnknownException(exception.getStatus());
      }

      const detailMessage: any = exception.getResponse();
      console.log(detailMessage.message);
      httpException.addContext({
        message: Array.isArray(detailMessage.message)
          ? detailMessage.message[0]
          : detailMessage.message,
        detail: detailMessage,
      });
      return response
        .status(httpException.getStatus())
        .json(httpException.toJson());
    }

    if (exception instanceof Error) {
      console.log(exception.stack);
      const internalServerError = new InternalServerException();

      internalServerError.addContext({
        message: exception.message,
      });

      return response
        .status(internalServerError.getStatus())
        .json(internalServerError.toJson());
    }
  }
}
