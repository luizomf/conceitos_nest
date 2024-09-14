import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecadoDto {
  @ApiProperty({
    example: 'Este é um recado de exemplo',
    description: 'O conteúdo textual do recado',
    minLength: 5,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string;

  @ApiProperty({
    example: 2,
    description: 'ID do destinatário do recado',
  })
  @IsPositive()
  paraId: number;
}
