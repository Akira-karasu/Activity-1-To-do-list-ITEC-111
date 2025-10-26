// Importing NestJS decorators and utilities
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';

// Importing the service that handles the actual business logic
import { TodoService } from './todo.service';

// Importing DTOs (Data Transfer Objects) for validation
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

// Importing a built-in NestJS pipe to ensure the `id` parameter is a number
import { ParseIntPipe } from '@nestjs/common';

// Define the base route for this controller
// All routes here will start with `/todo`
@Controller('todo')
export class TodoController {
  // Inject the TodoService so the controller can call service methods
  constructor(private readonly todoService: TodoService) {}

  // ===== GET /todo =====
  // Fetch and return all todo items
  @Get()
  findAll() {
    // Calls the service method to get all todos from the database
    return this.todoService.findAll();
  }

  // ===== GET /todo/:id =====
  // Fetch a single todo by its ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // Pass the ID to the service to find that specific todo
    return this.todoService.findOne(id);
  }

  // ===== POST /todo =====
  // Create a new todo item
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    // `@Body()` extracts JSON data from the request body
    // `createTodoDto` ensures it follows the validation rules (from class-validator)
    return this.todoService.create(createTodoDto);
  }

  // ===== PUT /todo/:id =====
  // Update a todo item by ID (used for editing text)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    // Pass ID and updated data to the service
    return this.todoService.update(id, updateTodoDto);
  }

  // ===== DELETE /todo/:id =====
  // Delete a todo item by ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    // Calls the service to delete a specific todo
    return this.todoService.remove(id);
  }

  // ===== PATCH /todo/:id/complete =====
  // Toggle or set a todo as completed (true/false)
  @Patch(':id/complete')
  setComplete(@Param('id', ParseIntPipe) id: number) {
    // The ParseIntPipe ensures the id is converted to a number automatically
    return this.todoService.setComplete(id);
  }
}
