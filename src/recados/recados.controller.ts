import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
    @Get()
    findAll() {
        return 'Essa rota retorna todos os recados';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `Essa rota retorna o recado ID ${id}`;
    }

    @Post()
    create() {
        return `Essa rota cria um recado`;
    }
}
