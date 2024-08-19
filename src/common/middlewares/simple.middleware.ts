import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware: Olá');
    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Luiz',
        sobrenome: 'Otávio',
      };
    }

    // if (authorization) {
    //   throw new BadRequestException('Bla bla');
    // }

    res.setHeader('CABECALHO', 'Do Middleware');

    // Terminando a cadeia de chamadas
    // return res.status(404).send({
    //   message: 'Não encontrado',
    // });

    next(); // Próximo middleware

    console.log('SimpleMiddleware: Tchau');

    res.on('finish', () => {
      console.log('SimpleMiddleware: Terminou');
    });
  }
}
