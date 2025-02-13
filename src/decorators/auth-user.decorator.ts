import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// custom decorator for get request user object
export const AuthUserProvider = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
