export class ReponseRecadoDto {
  id: number;
  texto: string;
  lido: boolean;
  data: Date;
  createdAt?: Date;
  updatedAt?: Date;

  de: {
    id: number;
    nome: string;
  };

  para: {
    id: number;
    nome: string;
  };
}
