import { Language } from '../common/enums/language';
import { Message } from './message';

export class ResponseHandler {
  static init(statusCode: number, message: string, result: any, status = true) {
    return {
      statusCode: statusCode,
      message: message,
      status: status,
      result: result,
    };
  }
}

export class CheckErrorCode {
  static init(code) {
    switch (code) {
      case 400:
        return 400;
      case 401:
        return 401;
      case 402:
        return 402;
      case 403:
        return 403;
      case 404:
        return 404;
      case 422:
        return 422;
      case 500:
        return 500;
      default:
        return 500;
    }
  }
}

export class ErrorApiResponse {
  static init(error) {
    console.log(error);
    if (CheckErrorCode.init(error.status) === 500) {
      return ResponseHandler.init(
        error.status,
        Message.INTERNAL_SERVER_ERROR[Language.EN],
        [],
      );
    }
    return ResponseHandler.init(
      error.status,
      error['response']['message'] ||
        Message.INTERNAL_SERVER_ERROR[Language.EN],
      [],
    );
  }
}
