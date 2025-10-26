import { CreateTodoDto } from './create-todo.dto';
// Import the CreateTodoDto so we can reuse its validation rules

// The UpdateTodoDto extends CreateTodoDto, meaning:
// It inherits all the same fields (title, completed) and their validation rules.
// This avoids repeating the same code.
export class UpdateTodoDto extends CreateTodoDto {}

// Exporting as default allows it to be imported without braces:
// e.g. `import UpdateTodoDto from './update-todo.dto';`
export default UpdateTodoDto;
