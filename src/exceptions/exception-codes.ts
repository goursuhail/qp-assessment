export enum ExceptionCodes {
  BAD_REQUEST = 'BAD_REQUEST',
  INVALID_TOKEN = 'INVALID_TOKEN',
  EXPIRED_TOKEN = 'EXPIRED_TOKEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  FORBIDDEN = 'FORBIDDEN',
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  CONFLICT = 'CONFLICT',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  UNPROCESSIBLE_ENTITY = 'UNPROCESSIBLE_ENTITY',
}

export const ExceptionCodeDetails = {
  UNAUTHORIZED: 'Invalid credentials, Please login again',
  INVALID_TOKEN: 'Invalid credentials, Please login again',
  EXPIRED_TOKEN: 'Session expired, Please login Again',
  BAD_REQUEST: 'Bad Request',
  FORBIDDEN: 'You do not have access rights to the requested resource',
  INTERNAL_SERVER_ERROR:
    'Sorry, we are unable to process your request, Please try again later',
  UNKNOWN_ERROR:
    'Sorry, we are unable to process your request, Please try again later',
  ENTITY_NOT_FOUND: 'Entity not found',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXIST: 'User already exist , with given credentials',
  EMAIL_ALREADY_EXIST: 'Email already exist',
  NICK_NAME_ALREADY_EXIST: 'Nick name already exists',
  CONFLICT: 'Resource already exists',
  INCORRECT_PASSWORD: 'Your email/password combination is incorrect',
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity Exception',
};
