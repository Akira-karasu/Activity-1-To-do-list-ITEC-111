// Import the Axios library for making HTTP requests
import axios from 'axios';

// Create an Axios instance — this is a preconfigured version of Axios
// so you don't have to repeat the same settings (like baseURL) in every request.
export const api = axios.create({
  // Base URL of your backend API (NestJS server)
  // All requests using this instance will start with this URL.
  baseURL: 'http://localhost:3000/todo',

  // Default headers sent with every request.
  // This tells the server that we are sending JSON data.
  headers: {
    'Content-Type': 'application/json',
  },

  // Optional: maximum time (in milliseconds) Axios will wait before failing a request.
  timeout: 5000, // 5 seconds
});

// Export the Axios instance so it can be imported and used anywhere in your app.
// Example usage: `api.get('/')` or `api.post('/', { title: 'New task' })`
export default api;
