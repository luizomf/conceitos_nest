import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import globalConfig from 'src/global-config/global.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RecadosModule } from 'src/recados/recados.module';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { GlobalConfigModule } from 'src/global-config/global-config.module';
import * as path from 'path';
import { AppModule } from 'src/app/app.module';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePessoaDto } from 'src/pessoas/dto/create-pessoa.dto';

const login = async (
  app: INestApplication,
  email: string,
  password: string,
) => {
  const response = await request(app.getHttpServer())
    .post('/auth')
    .send({ email, password });

  return response.body.accessToken;
};

const createUserAndLogin = async (app: INestApplication) => {
  const nome = 'Any User';
  const email = 'anyuser@email.com';
  const password = '123456';

  await request(app.getHttpServer()).post('/pessoas').send({
    nome,
    email,
    password,
  });

  return login(app, email, password);
};

describe('PessoasController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(globalConfig),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          database: 'testing', // MUITO CUIDADO
          password: '123456',
          autoLoadEntities: true,
          synchronize: true, // MUITO CUIDADO
          dropSchema: true, // MUITO CUIDADO
        }),
        ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, '..', '..', 'pictures'),
          serveRoot: '/pictures',
        }),
        RecadosModule,
        PessoasModule,
        GlobalConfigModule,
        AppModule,
      ],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: false,
      }),
      new ParseIntIdPipe(),
    );
    await app.init();

    authToken = await createUserAndLogin(app);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /pessoas', () => {
    it('deve criar uma pessoa sem erros', async () => {
      const createPessoaDto: CreatePessoaDto = {
        email: 'luiz@email.com',
        nome: 'Luiz',
        password: '123456',
      };
      const response = await request(app.getHttpServer())
        .post('/pessoas')
        .send(createPessoaDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({
        active: true,
        createdAt: expect.any(String),
        email: createPessoaDto.email,
        id: expect.any(Number),
        nome: createPessoaDto.nome,
        passwordHash: expect.any(String),
        picture: '',
        updatedAt: expect.any(String),
      });
    });

    it('deve gerar um erro de e-mail já existe', async () => {
      const createPessoaDto: CreatePessoaDto = {
        email: 'luiz@email.com',
        nome: 'Luiz',
        password: '123456',
      };

      await request(app.getHttpServer())
        .post('/pessoas')
        .send(createPessoaDto)
        .expect(HttpStatus.CREATED);

      const response = await request(app.getHttpServer())
        .post('/pessoas')
        .send(createPessoaDto)
        .expect(HttpStatus.CONFLICT);

      expect(response.body.message).toBe('E-mail já está cadastrado.');
    });

    it('deve gerar um erro de senha curta', async () => {
      const createPessoaDto: CreatePessoaDto = {
        email: 'luiz@email.com',
        nome: 'Luiz',
        password: '123',
      };

      const response = await request(app.getHttpServer())
        .post('/pessoas')
        .send(createPessoaDto)
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toEqual([
        'password must be longer than or equal to 5 characters',
      ]);
    });
  });

  describe('GET /pessoas', () => {
    it('deve retornar todas as pessoas', async () => {
      await request(app.getHttpServer())
        .post('/pessoas')
        .send({
          email: 'luiz@email.com',
          nome: 'Luiz',
          password: '123456',
        })
        .expect(HttpStatus.CREATED);

      const response = await request(app.getHttpServer())
        .get('/pessoas')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            email: 'luiz@email.com',
            nome: 'Luiz',
          }),
        ]),
      );
    });
  });

  describe('GET /pessoas/:id', () => {
    it('deve retornar uma pessoa pelo ID', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/pessoas')
        .send({
          email: 'luiz@email.com',
          nome: 'Luiz',
          password: '123456',
        })
        .expect(HttpStatus.CREATED);

      const personId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .get(`/pessoas/${personId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: personId,
          email: 'luiz@email.com',
          nome: 'Luiz',
        }),
      );
    });

    it('deve retornar erro para pessoa não encontrada', async () => {
      await request(app.getHttpServer())
        .get('/pessoas/9999') // ID fictício
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('PATCH /pessoas/:id', () => {
    it('deve atualizar uma pessoa', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/pessoas')
        .send({
          email: 'luiz@email.com',
          nome: 'Luiz',
          password: '123456',
        })
        .expect(HttpStatus.CREATED);

      const personId = createResponse.body.id;

      const authToken = await login(app, 'luiz@email.com', '123456');

      const updateResponse = await request(app.getHttpServer())
        .patch(`/pessoas/${personId}`)
        .send({
          nome: 'Luiz Atualizado',
        })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);

      expect(updateResponse.body).toEqual(
        expect.objectContaining({
          id: personId,
          nome: 'Luiz Atualizado',
        }),
      );
    });

    it('deve retornar erro para pessoa não encontrada', async () => {
      await request(app.getHttpServer())
        .patch('/pessoas/9999') // ID fictício
        .send({
          nome: 'Nome Atualizado',
        })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /pessoas/:id', () => {
    it('deve remover uma pessoa', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/pessoas')
        .send({
          email: 'luiz@email.com',
          nome: 'Luiz',
          password: '123456',
        })
        .expect(HttpStatus.CREATED);

      const authToken = await login(app, 'luiz@email.com', '123456');

      const personId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .delete(`/pessoas/${personId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.OK);

      expect(response.body.email).toBe('luiz@email.com');
    });

    it('deve retornar erro para pessoa não encontrada', async () => {
      await request(app.getHttpServer())
        .delete('/pessoas/9999') // ID fictício
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
