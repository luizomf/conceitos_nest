import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home') // /home
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Método da solicitação -> Ler (Read) -> CRUD
  // /home/hello
  @Get('hello')
  getHello(): string {
    const retorno = 'Retorno.';
    return retorno;
  }

  @Get('exemplo')
  exemplo() {
    return this.appService.solucionaExemplo();
  }
}
