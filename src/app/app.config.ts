import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  database: {
    type: process.env.DATABASE_TYPE as 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
  },
  environment: process.env.NODE_ENV || 'development',
}));
