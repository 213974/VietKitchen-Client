import { io } from 'socket.io-client';

// This file configures and exports a singleton Socket.IO client instance.

// Construct the WebSocket server URL from the API URL environment variable.
// This removes the '/api' path to connect to the root of the server where Socket.IO is listening.
const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

// Create and export the socket instance.
// This single instance will be used throughout the application for real-time communication.
export const socket = io(SOCKET_URL);