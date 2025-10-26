// Importing global styles
import './styles/App.css';

// Importing reusable UI components
import IconButton from './components/iconButton';
import TextInput from './components/textInput';

// Importing icon images for buttons
import bin from '../src/assets/icons/bin.png';
import pencil from '../src/assets/icons/pencil.png';
import plus from '../src/assets/icons/plus.png';
import save from '../src/assets/icons/save.png';

// Importing the custom hook that manages ToDo logic (state + functions)
import { useTodo } from '../src/hooks/useTodo';

function App() {
  // Destructure values and functions from the custom useTodo hook
  const {
    filterList,    // Filtered list of todos (based on search)
    addList,       // Input value for adding a new todo
    setAddList,    // Function to update 'addList' input
    searchList,    // Input value for search
    setSearchList, // Function to update 'searchList'
    editingId,     // ID of the todo currently being edited
    editValue,     // Current text value of the todo being edited
    setEditValue,  // Function to update 'editValue'
    handleAdd,     // Adds a new todo item
    handleDelete,  // Deletes a todo by ID
    startEditing,  // Puts a specific todo into edit mode
    saveEdit,      // Saves the edited todo
    toggleComplete // Toggles completed status (true/false)
  } = useTodo();

  return (
    <div className="container">
      {/* ==== HEADER SECTION ==== */}
      <div className="header">
        <h1>To Do List</h1>

        {/* Search input to filter todos */}
        <TextInput
          placeholder="Search plan"
          value={searchList}
          onChange={(e) => setSearchList(e.target.value)}
        />
      </div>

      {/* ==== MAIN CONTENT SECTION ==== */}
      <div className="content">
        <ul>
          {/* Check if there are any todos to show */}
          {filterList.length > 0 ? (
            filterList.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {/* If currently editing this todo, show editable input */}
                {editingId === todo.id ? (
                  <TextInput
                    placeholder="Edit item"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  <>
                    {/* Checkbox for marking todo complete/incomplete */}
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    />

                    {/* Todo text - line-through if completed */}
                    <span
                      style={{
                        textDecoration: todo.completed ? 'line-through' : 'none'
                      }}
                    >
                      {todo.title}
                    </span>
                  </>
                )}

                {/* ==== ACTION BUTTONS ==== */}
                <div>
                  {/* Show SAVE button if editing */}
                  {editingId === todo.id ? (
                    <IconButton
                      icon={save}
                      alt="save"
                      onClick={() => saveEdit(todo.id)}
                      backgroundColor="#dbcf24"
                    />
                  ) : (
                    // Show EDIT button only if not completed
                    !todo.completed && (
                      <IconButton
                        icon={pencil}
                        alt="edit"
                        onClick={() => startEditing(todo.id, todo.title)}
                        backgroundColor="#46CAFF"
                      />
                    )
                  )}

                  {/* DELETE button (always visible) */}
                  <IconButton
                    icon={bin}
                    alt="delete"
                    onClick={() => handleDelete(todo.id)}
                    backgroundColor="#F44A4A"
                  />
                </div>
              </li>
            ))
          ) : (
            // Show message when no todos found
            <p>No items found</p>
          )}
        </ul>
      </div>

      {/* ==== INPUT SECTION FOR ADDING NEW TODOS ==== */}
      <div className="input">
        {/* Text input for adding a new task */}
        <TextInput
          placeholder="What's your plan?"
          value={addList}
          onChange={(e) => setAddList(e.target.value)}
        />

        {/* Add button (green plus icon) */}
        <IconButton
          icon={plus}
          alt="add"
          onClick={handleAdd}
          backgroundColor="#56C06D"
        />
      </div>
    </div>
  );
}

// Exporting the App component to be used in index.tsx
export default App;
