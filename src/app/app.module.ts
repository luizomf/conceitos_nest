import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitosManualModule } from 'src/conceitos-manual/conceitos-manual.module';
import { ConceitosAutomaticoModule } from 'src/conceitos-automatico/conceitos-automatico.module';

@Module({
  imports: [ConceitosManualModule, ConceitosAutomaticoModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
