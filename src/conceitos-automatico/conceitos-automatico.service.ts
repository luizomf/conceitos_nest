import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  getHome() {
    return 'conceitos-automatico (ConceitosAutomaticoService)';
  }
}
