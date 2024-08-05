import { Controller } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
    // Encontra todos os recados
    // /recados/
    findAll() {
        return 'Essa rota retorna todos os recados';
    }

    // Encontra um recado
    // /recados/:id/
    findOne() {
        return 'Essa rota retorna UM recado';
    }
}
