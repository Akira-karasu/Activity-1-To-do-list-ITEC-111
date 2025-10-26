import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  // Registering modules or entities that this module depends on
  imports: [
    // TypeOrmModule.forFeature allows this module to use the Todo entity
    // and inject its corresponding repository (e.g., TodoRepository)
    TypeOrmModule.forFeature([Todo]),
  ],

  // Controllers handle incoming HTTP requests and return responses
  controllers: [TodoController],

  // Providers are services or classes that contain the business logic
  providers: [TodoService],

  // Exports make this service available to other modules if they import TodoModule
  exports: [TodoService],
})
export class TodoModule {}
