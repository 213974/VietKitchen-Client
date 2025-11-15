import { io } from 'socket.io-client';

// --- FIX: Use process.env and the REACT_APP_ prefix for Create React App ---
const SOCKET_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

// Create and export the socket instance.
export const socket = io(SOCKET_URL);