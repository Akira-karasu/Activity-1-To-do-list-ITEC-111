import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable() // Makes this class available for dependency injection (can be used in controllers)
export class TodoService {
  constructor(
    // Injects the TypeORM repository for the Todo entity — used for database operations
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  // 🟢 Get all todos from the database
  async findAll(): Promise<Todo[]> {
    try {
      // Fetch all todos from the database
      const todos: Todo[] = await this.todoRepo.find();

      // If the list is empty, throw a "Not Found" error
      if (!todos.length) {
        throw new NotFoundException('No todos found in the database.');
      }

      // Return all todos
      return todos;
    } catch (error: unknown) {
      // If any unexpected error occurs (like DB connection issue), throw a server error
      throw new InternalServerErrorException('Failed to fetch todos.');
    }
  }

  // 🔵 Get a single todo item by its ID
  async findOne(id: number): Promise<Todo> {
    // Try to find the todo in the database
    const todo: Todo | null = await this.todoRepo.findOne({ where: { id } });

    // If not found, throw an HTTP 404 (Not Found) error
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found.`);
    }

    // Return the found todo
    return todo;
  }

  // 🟢 Create a new todo record
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    // If the title is empty or just spaces, throw a 400 Bad Request error
    if (!createTodoDto.title || !createTodoDto.title.trim()) {
      throw new BadRequestException('Title cannot be empty.');
    }

    try {
      // Create a new Todo entity using the provided DTO
      const todo: Todo = this.todoRepo.create(createTodoDto);

      // Save the new todo to the database
      return await this.todoRepo.save(todo);
    } catch (error: unknown) {
      // If something goes wrong with saving (like DB issue), throw a 500 error
      throw new InternalServerErrorException('Failed to create a new todo.');
    }
  }

  // 🟡 Update an existing todo by ID
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    // First, check if the todo exists
    const todo: Todo | null = await this.todoRepo.findOne({ where: { id } });

    // If not found, throw a 404 error
    if (!todo) {
      throw new NotFoundException(
        `Cannot update. Todo with ID ${id} not found.`,
      );
    }

    // Merge the new data into the existing todo
    Object.assign(todo, updateTodoDto);

    try {
      // Save the updated todo to the database
      const updatedTodo: Todo = await this.todoRepo.save(todo);
      return updatedTodo;
    } catch (error: unknown) {
      // If update fails, throw a 500 error
      throw new InternalServerErrorException(
        `Failed to update todo with ID ${id}.`,
      );
    }
  }

  // 🔴 Delete a todo by ID
  async remove(id: number): Promise<string> {
    // Find the todo first
    const todo: Todo | null = await this.todoRepo.findOne({ where: { id } });

    // If it doesn’t exist, throw a 404 error
    if (!todo) {
      throw new NotFoundException(
        `Cannot delete. Todo with ID ${id} not found.`,
      );
    }

    try {
      // Delete the todo
      await this.todoRepo.delete(id);

      // Return a success message
      return `Todo with ID ${id} has been successfully deleted.`;
    } catch (error: unknown) {
      // If deletion fails (DB issue, etc.), throw a 500 error
      throw new InternalServerErrorException(
        `Failed to delete todo with ID ${id}.`,
      );
    }
  }

  // 🟣 Toggle the "completed" status of a todo (true/false)
  async setComplete(id: number): Promise<Todo> {
    // Find the todo by ID
    const todo: Todo | null = await this.todoRepo.findOne({ where: { id } });

    // If not found, throw a 404 error
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found.`);
    }

    try {
      // Toggle completed status: if true → false, if false → true
      todo.completed = !todo.completed;

      // Save the updated todo to the database
      const updatedTodo: Todo = await this.todoRepo.save(todo);
      return updatedTodo;
    } catch (error: unknown) {
      // If save fails, throw a 500 internal error
      throw new InternalServerErrorException(
        `Failed to toggle completion for todo with ID ${id}.`,
      );
    }
  }
}

export default TodoService;
