import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ctfpswd231',
  database: 'toDo_db',
  autoLoadEntities: true,
  synchronize: true,
};

export default config;
