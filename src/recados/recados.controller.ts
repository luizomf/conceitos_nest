import { Controller, Get } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
    @Get()
    findAll() {
        return 'Essa rota retorna todos os recados';
    }

    @Get(':id')
    findOne() {
        return 'Essa rota retorna UM recado';
    }
}
