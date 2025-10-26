// Import React hooks for managing state and lifecycle
import { useState, useEffect } from 'react';

// Import preconfigured Axios instance for API requests
import { api } from '../api/apiAxios';

// Define the shape (interface) of a Todo item
export interface Todo {
  id: number;        // Unique identifier
  title: string;     // Text description of the todo
  completed: boolean; // Status: true if done, false if not
}

// Custom hook to handle all ToDo-related logic
export function useTodo() {
  // ====== STATE MANAGEMENT ======
  const [toDoList, setToDoList] = useState<Todo[]>([]); // List of all todos
  const [addList, setAddList] = useState('');            // Input value for adding new todos
  const [searchList, setSearchList] = useState('');      // Input value for searching todos
  const [editingId, setEditingId] = useState<number | null>(null); // ID of todo being edited
  const [editValue, setEditValue] = useState('');        // Value of todo currently being edited

  // ====== FILTER FUNCTION ======
  // Filters todos based on search term (case-insensitive)
  const filterList = toDoList.filter((item) =>
    item.title.toLowerCase().includes(searchList.toLowerCase())
  );

  // ====== LOAD TODOS FROM BACKEND ======
  const loadTodos = async () => {
    try {
      // Fetch todos from the backend API
      const res = await api.get<Todo[]>('/');
      // Update the list with fetched data
      setToDoList(res.data);
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  };

  // Load todos when component first mounts
  useEffect(() => {
    loadTodos();
  }, []);

  // ====== ADD A NEW TODO ======
  const handleAdd = async () => {
    // Prevent adding empty tasks
    if (!addList.trim()) return;
    try {
      // Send new todo to backend
      await api.post('/', { title: addList });
      // Clear input after successful add
      setAddList('');
      // Reload the updated todo list
      loadTodos();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  // ====== DELETE A TODO ======
  const handleDelete = async (id: number) => {
    try {
      // Delete todo by ID
      await api.delete(`/${id}`);
      // Refresh list after deletion
      loadTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  // ====== START EDITING A TODO ======
  const startEditing = (id: number, currentTitle: string) => {
    setEditingId(id);         // Set the ID of the todo being edited
    setEditValue(currentTitle); // Fill input with current title
  };

  // ====== SAVE EDITED TODO ======
  const saveEdit = async (id: number) => {
    // Prevent saving empty titles
    if (!editValue.trim()) return;
    try {
      // Update todo title in backend
      await api.put(`/${id}`, { title: editValue });
      // Clear editing state after saving
      setEditingId(null);
      setEditValue('');
      // Reload updated list
      loadTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  // ====== TOGGLE COMPLETED STATE ======
  const toggleComplete = async (id: number) => {
    try {
      // Call backend PATCH endpoint to toggle completion
      await api.patch(`/${id}/complete`);
      // Refresh list to reflect change
      loadTodos();
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  // ====== RETURN EVERYTHING NEEDED BY APP COMPONENT ======
  return {
    toDoList,       // Full todo list
    addList,        // Input value for new todo
    setAddList,     // Setter for add input
    searchList,     // Search text
    setSearchList,  // Setter for search input
    filterList,     // Filtered todo list (used in UI)
    editingId,      // ID of todo being edited
    editValue,      // Value of edited todo
    setEditValue,   // Setter for edit input
    handleAdd,      // Function to add new todo
    handleDelete,   // Function to delete a todo
    startEditing,   // Function to enter edit mode
    saveEdit,       // Function to save changes
    toggleComplete, // Function to toggle completion
    setEditingId,   // Expose editing ID setter if needed
  };
}
