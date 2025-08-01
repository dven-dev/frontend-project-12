// Обновите src/services/socket.js
import { io } from 'socket.io-client';
import { getSocketUrl } from '../services/apiUtils.js';

// Создаем функцию для инициализации сокета
const createSocket = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.warn('No token found, socket connection will be delayed');
    return null;
  }

  const socketUrl = getSocketUrl();
  
  const socket = io(socketUrl, {
    transports: ['websocket', 'polling'], 
    auth: {
      token,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    timeout: 20000,
    forceNew: true,
    upgrade: true,
  });

  socket.on('connect', () => {
    console.log('Socket connected to:', socketUrl);
    console.log('Socket ID:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
    
    if (error.message && error.message.includes('unauthorized')) {
      console.log('Socket authentication failed, redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
  });

  return socket;
};

let socket = null;

const getSocket = () => {
  if (!socket) {
    socket = createSocket();
  }
  return socket;
};

const reconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
  socket = createSocket();
  return socket;
};

export { getSocket, reconnectSocket };
export default getSocket();
