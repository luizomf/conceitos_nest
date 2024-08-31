import { IsEmail } from 'class-validator';
import { Recado } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ length: 100 })
  nome: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // Uma pessoa pode ter enviado muitos recados (como "de")
  // Esses recados são relacionados ao campo "de" na entidade recado
  @OneToMany(() => Recado, recado => recado.de)
  recadosEnviados: Recado[];

  // Uma pessoa pode ter recebido muitos recados (como "para")
  // Esses recados são relacionados ao campo "para" na entidade recado
  @OneToMany(() => Recado, recado => recado.para)
  recadosRecebidos: Recado[];

  @Column({ default: true })
  active: boolean;

  @Column({ default: '' })
  picture: string;

  // @Column({ type: 'simple-array', default: [] })
  // routePolicies: RoutePolicies[];
}
