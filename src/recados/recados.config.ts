import { registerAs } from '@nestjs/config';

export default registerAs('recados', () => ({
  teste1: 'VALOR 1',
  teste2: 'VALOR 2',
}));
