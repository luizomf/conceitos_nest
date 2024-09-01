import { Repository } from 'typeorm';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './entities/pessoa.entity';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('PessoasService', () => {
  let pessoaService: PessoasService;
  let pessoaRepository: Repository<Pessoa>;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoasService,
        {
          provide: getRepositoryToken(Pessoa),
          useValue: {
            save: jest.fn(),
            create: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    pessoaService = module.get<PessoasService>(PessoasService);
    pessoaRepository = module.get<Repository<Pessoa>>(
      getRepositoryToken(Pessoa),
    );
    hashingService = module.get<HashingService>(HashingService);
  });

  it('pessoaService deve estar definido', () => {
    expect(pessoaService).toBeDefined();
  });

  describe('create', () => {
    it('deve criar uma nova pessoa', async () => {
      // Arange
      const createPessoaDto: CreatePessoaDto = {
        email: 'luiz@email.com',
        nome: 'Luiz',
        password: '123456',
      };
      const passwordHash = 'HASHDESENHA';
      const novaPessoa = {
        id: 1,
        nome: createPessoaDto.nome,
        email: createPessoaDto.email,
        passwordHash,
      };

      // Como o valor retornado por hashingService.hash é necessário
      // vamos simular este valor.
      jest.spyOn(hashingService, 'hash').mockResolvedValue(passwordHash);
      // Como a pessoa retornada por pessoaRepository.create é necessária em
      // pessoaRepository.save. Vamos simular este valor.
      jest.spyOn(pessoaRepository, 'create').mockReturnValue(novaPessoa as any);

      // Act -> Ação
      const result = await pessoaService.create(createPessoaDto);

      // Assert
      // O método hashingService.hash foi chamado com createPessoaDto.password?
      expect(hashingService.hash).toHaveBeenCalledWith(
        createPessoaDto.password,
      );

      // O método pessoaRepository.create foi chamado com os dados da nova
      // pessoa com o hash de senha gerado por hashingService.hash?
      expect(pessoaRepository.create).toHaveBeenCalledWith({
        nome: createPessoaDto.nome,
        passwordHash,
        email: createPessoaDto.email,
      });

      // O método pessoaRepository.save foi chamado com os dados da nova
      // pessoa gerada por pessoaRepository.create?
      expect(pessoaRepository.save).toHaveBeenCalledWith(novaPessoa);

      // O resultado do método pessoaService.create retornou a nova
      // pessoa criada?
      expect(result).toEqual(novaPessoa);
    });

    it('deve lançar ConflictException quando e-mail já existe', async () => {
      jest.spyOn(pessoaRepository, 'save').mockRejectedValue({
        code: '23505',
      });

      await expect(pessoaService.create({} as any)).rejects.toThrow(
        ConflictException,
      );
    });

    it('deve lançar ConflictException quando e-mail já existe', async () => {
      jest
        .spyOn(pessoaRepository, 'save')
        .mockRejectedValue(new Error('Erro genérico'));

      await expect(pessoaService.create({} as any)).rejects.toThrow(
        new Error('Erro genérico'),
      );
    });
  });

  describe('findOne', () => {
    it('deve retornar uma pessoa se a pessoa for encontrada', async () => {
      const pessoaId = 1;
      const pessoaEncontrada = {
        id: pessoaId,
        nome: 'Luiz',
        email: 'luiz@email.com',
        passwordHash: '123456',
      };

      jest
        .spyOn(pessoaRepository, 'findOneBy')
        .mockResolvedValue(pessoaEncontrada as any);

      const result = await pessoaService.findOne(pessoaId);

      expect(result).toEqual(pessoaEncontrada);
    });

    it('deve retornar uma pessoa se a pessoa for encontrada', async () => {
      await expect(pessoaService.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
