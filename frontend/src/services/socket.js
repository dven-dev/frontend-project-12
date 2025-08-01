import { io } from 'socket.io-client';

const getSocketUrl = () => {
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5001';
  }
  
  return window.location.origin;
};

const token = localStorage.getItem('token');

const socket = io(getSocketUrl(), {
  transports: ['websocket', 'polling'], 
  auth: {
    token,
  },
 
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  timeout: 20000,
});


socket.on('connect', () => {
  console.log('Socket connected to:', getSocketUrl());
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

export default socket;
