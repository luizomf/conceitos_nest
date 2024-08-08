import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home') // /home
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('hello')
  getHello(): string {
    const retorno = 'Retorno.';
    return retorno;
  }

  // @Get('exemplo')
  exemplo() {
    return this.appService.solucionaExemplo();
  }
}
