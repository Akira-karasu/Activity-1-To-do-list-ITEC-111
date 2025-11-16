// ...existing code...
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

// load .env from project root
dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASS ?? 'ctfpswd231', // fallback for dev only
  database: process.env.DB_NAME ?? 'toDo_db',
  autoLoadEntities: true,
  synchronize: true,
};

export default config;
// ...existing code...