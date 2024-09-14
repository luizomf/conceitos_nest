import { ApiProperty } from '@nestjs/swagger';

export class ReponseRecadoDto {
  @ApiProperty({ example: 1, description: 'ID único do recado' })
  id: number;

  @ApiProperty({
    example: 'Este é o conteúdo do recado',
    description: 'Texto do recado',
  })
  texto: string;

  @ApiProperty({ example: true, description: 'Indica se o recado foi lido' })
  lido: boolean;

  @ApiProperty({
    example: '2024-09-14T10:00:00.000Z',
    description: 'Data do recado',
  })
  data: Date;

  @ApiProperty({
    example: '2024-09-10T12:34:56.000Z',
    description: 'Data de criação do recado',
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    example: '2024-09-11T15:20:10.000Z',
    description: 'Data da última atualização do recado',
    required: false,
  })
  updatedAt?: Date;

  @ApiProperty({
    example: { id: 1, nome: 'João Silva' },
    description: 'Informações sobre o remetente do recado',
  })
  de: {
    id: number;
    nome: string;
  };

  @ApiProperty({
    example: { id: 2, nome: 'Maria Oliveira' },
    description: 'Informações sobre o destinatário do recado',
  })
  para: {
    id: number;
    nome: string;
  };
}
