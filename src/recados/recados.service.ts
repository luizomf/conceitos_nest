import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Joana',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number) {
    // const recado = this.recados.find(item => item.id === id);
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
    });

    if (recado) return recado;

    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadoRepository.create(novoRecado);
    return this.recadoRepository.save(recado);
  }

  update(id: string, updateRecadoDto: UpdateRecadoDto) {
    const recadoExistenteIndex = this.recados.findIndex(
      item => item.id === +id,
    );

    if (recadoExistenteIndex < 0) {
      this.throwNotFoundError();
    }

    const recadoExistente = this.recados[recadoExistenteIndex];

    this.recados[recadoExistenteIndex] = {
      ...recadoExistente,
      ...updateRecadoDto,
    };

    return this.recados[recadoExistenteIndex];
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({
      id,
    });

    if (!recado) return this.throwNotFoundError();

    return this.recadoRepository.remove(recado);
  }
}
