import { io } from 'socket.io-client';

const getSocketUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5001';
  }
  return window.location.origin;
};

// Создаем функцию для инициализации сокета
const createSocket = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.warn('No token found, socket connection will be delayed');
    return null;
  }

  const socket = io(getSocketUrl(), {
    transports: ['websocket', 'polling'], 
    auth: {
      token,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    timeout: 20000,
    // Добавим дополнительные опции для лучшей совместимости
    forceNew: true,
    upgrade: true,
  });

  socket.on('connect', () => {
    console.log('Socket connected to:', getSocketUrl());
    console.log('Socket ID:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
    
    // Если ошибка связана с аутентификацией
    if (error.message && error.message.includes('unauthorized')) {
      console.log('Socket authentication failed, redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
  });

  return socket;
};

// Экспортируем функцию создания сокета, а не сам сокет
let socket = null;

const getSocket = () => {
  if (!socket) {
    socket = createSocket();
  }
  return socket;
};

// Функция для переподключения сокета после логина
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
