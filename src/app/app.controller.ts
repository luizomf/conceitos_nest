import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import appConfig from './app.config';
import { ConfigType } from '@nestjs/config';

@Controller('home') // /home
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}

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
