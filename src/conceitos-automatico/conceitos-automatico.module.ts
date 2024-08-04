import { Module } from '@nestjs/common';
import { ConceitosAutomaticoController } from './conceitos-automatico.controller';

@Module({
  controllers: [ConceitosAutomaticoController]
})
export class ConceitosAutomaticoModule {}
