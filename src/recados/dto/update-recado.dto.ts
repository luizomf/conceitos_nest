import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRecadoDto } from './create-recado.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  @ApiProperty({
    example: true,
    description: 'Indica se o recado foi lido ou não',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly lido?: boolean;

  // @ApiHideProperty()
  // readonly testando?: string;
}
