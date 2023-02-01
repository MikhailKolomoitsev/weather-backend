import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface RequestInterface {
  user: {
    email: string;
    accessToken: string;
  };
}
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest<RequestInterface>().user;
  },
);
