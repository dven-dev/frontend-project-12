import { io } from 'socket.io-client'
import { getSocketUrl } from '../services/apiUtils.js'

const createSocket = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  const socketUrl = getSocketUrl()
  
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
  })

  socket.on('connect', () => {
    // Removed console.log: console.log('Socket connected to:', socketUrl);
    // Removed console.log: console.log('Socket ID:', socket.id);
  })

  socket.on('disconnect', (reason) => {
    // Socket disconnected
  })

  socket.on('connect_error', (error) => {
    if (error.message && error.message.includes('unauthorized')) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      window.location.href = '/login'
    }
  })

  return socket
}

let socket = null

const getSocket = () => {
  if (!socket) {
    socket = createSocket()
  }
  return socket
}

const reconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
  socket = createSocket()
  return socket
}

export { getSocket, reconnectSocket }
export default getSocket()
