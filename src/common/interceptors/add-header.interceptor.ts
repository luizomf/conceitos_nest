import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('AddHeaderInterceptor executado.');

    const response = context.switchToHttp().getResponse();

    response.setHeader('X-Custom-Header', 'O valor do cabeçalho');

    return next.handle();
  }
}
