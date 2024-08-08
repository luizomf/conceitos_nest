import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';

@Module({
  controllers: [RecadosController],
})
export class RecadosModule {}
