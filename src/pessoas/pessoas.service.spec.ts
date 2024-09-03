import { Repository } from 'typeorm';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './entities/pessoa.entity';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

describe('PessoasService', () => {
  let pessoasService: PessoasService;
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
            find: jest.fn(),
            preload: jest.fn(),
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

    pessoasService = module.get<PessoasService>(PessoasService);
    pessoaRepository = module.get<Repository<Pessoa>>(
      getRepositoryToken(Pessoa),
    );
    hashingService = module.get<HashingService>(HashingService);
  });

  it('pessoaService deve estar definido', () => {
    expect(pessoasService).toBeDefined();
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
      const result = await pessoasService.create(createPessoaDto);

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

      await expect(pessoasService.create({} as any)).rejects.toThrow(
        ConflictException,
      );
    });

    it('deve lançar um erro genérico quando um erro for lançado', async () => {
      jest
        .spyOn(pessoaRepository, 'save')
        .mockRejectedValue(new Error('Erro genérico'));

      await expect(pessoasService.create({} as any)).rejects.toThrow(
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

      const result = await pessoasService.findOne(pessoaId);

      expect(result).toEqual(pessoaEncontrada);
    });

    it('deve lançar um erro se a pessoa não for encontrada', async () => {
      await expect(pessoasService.findOne(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as pessoas', async () => {
      const pessoasMock: Pessoa[] = [
        {
          id: 1,
          nome: 'Luiz',
          email: 'luiz@email.com',
          passwordHash: '123456',
        } as Pessoa,
      ];

      jest.spyOn(pessoaRepository, 'find').mockResolvedValue(pessoasMock);

      const result = await pessoasService.findAll();

      expect(result).toEqual(pessoasMock);
      expect(pessoaRepository.find).toHaveBeenCalledWith({
        order: {
          id: 'desc',
        },
      });
    });
  });

  describe('update', () => {
    it('deve atualizar uma pessoa se for autorizado', async () => {
      // Arrange
      const pessoaId = 1;
      const updatePessoaDto = { nome: 'Joana', password: '654321' };
      const tokenPayload = { sub: pessoaId } as any;
      const passwordHash = 'HASHDESENHA';
      const updatedPessoa = { id: pessoaId, nome: 'Joana', passwordHash };

      jest.spyOn(hashingService, 'hash').mockResolvedValueOnce(passwordHash);
      jest
        .spyOn(pessoaRepository, 'preload')
        .mockResolvedValue(updatedPessoa as any);
      jest
        .spyOn(pessoaRepository, 'save')
        .mockResolvedValue(updatedPessoa as any);

      // Act
      const result = await pessoasService.update(
        pessoaId,
        updatePessoaDto,
        tokenPayload,
      );

      // Assert
      expect(hashingService.hash).toHaveBeenCalledWith(
        updatePessoaDto.password,
      );
      expect(pessoaRepository.preload).toHaveBeenCalledWith({
        id: pessoaId,
        nome: updatePessoaDto.nome,
        passwordHash,
      });
      expect(pessoaRepository.save).toHaveBeenCalledWith(updatedPessoa);
      expect(result).toEqual(updatedPessoa);
    });

    it('deve lançar ForbiddenException se usuário não autorizado', async () => {
      // Arrange
      const pessoaId = 1; // Usuário certo (ID 1)
      const tokenPayload = { sub: 2 } as any; // Usuário diferente (ID 2)
      const updatePessoaDto = { nome: 'Jane Doe' };
      const existingPessoa = { id: pessoaId, nome: 'John Doe' };

      // Simula que a pessoa existe
      jest
        .spyOn(pessoaRepository, 'preload')
        .mockResolvedValue(existingPessoa as any);

      // Act e Assert
      await expect(
        pessoasService.update(pessoaId, updatePessoaDto, tokenPayload),
      ).rejects.toThrow(ForbiddenException);
    });

    it('deve lançar NotFoundException se a pessoa não existe', async () => {
      // Arrange
      const pessoaId = 1;
      const tokenPayload = { sub: pessoaId } as any;
      const updatePessoaDto = { nome: 'Jane Doe' };

      // Simula que preload retornou null
      jest.spyOn(pessoaRepository, 'preload').mockResolvedValue(null);

      // Act e Assert
      await expect(
        pessoasService.update(pessoaId, updatePessoaDto, tokenPayload),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
