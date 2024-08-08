import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';

@Module({
  imports: [RecadosModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
