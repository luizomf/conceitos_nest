import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';
import { ConfigModule } from '@nestjs/config';
import recadosConfig from './recados.config';

@Module({
  imports: [
    ConfigModule.forFeature(recadosConfig),
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
  ],
  controllers: [RecadosController],
  providers: [RecadosService, RecadosUtils],
  exports: [RecadosUtils],
})
export class RecadosModule {}
