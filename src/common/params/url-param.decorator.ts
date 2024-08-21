import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UrlParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();
    const request: Request = context.getRequest();
    return request.url;
  },
);
