import { Controller, Get } from '@nestjs/common';

@Controller('conceitos-automatico')
export class ConceitosAutomaticoController {
    @Get()
    home(): string {
      return 'conceitos-automatico';
    }
}
