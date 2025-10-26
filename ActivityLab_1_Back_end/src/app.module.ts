import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './module/todo/todo.module';
import ormconfig from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
