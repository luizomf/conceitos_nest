import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll() {
        return 'Essa rota retorna todos os recados';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `Essa rota retorna o recado ID ${id}`;
    }

    @Post()
    create(@Body() body: any) {
        return body;
    }
}
