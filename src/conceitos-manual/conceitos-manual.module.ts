import { Module } from '@nestjs/common';
import { ConceitosManualController } from './conceitos-manual.controller';

@Module({
  controllers: [ConceitosManualController],
})
export class ConceitosManualModule {}
