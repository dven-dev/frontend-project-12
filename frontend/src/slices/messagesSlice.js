import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice.js'
import api from '../services/axiosConfig.js'
import routes from '../routes.js'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(routes.messagesPath())
      return Array.isArray(response.data) ? response.data : []
    }
    catch (error) {
      console.error('Fetch messages error:', error)
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await api.post(routes.messagesPath(), messageData)
      return response.data
    }
    catch (error) {
      console.error('Send message error:', error)
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

export const editMessage = createAsyncThunk(
  'messages/editMessage',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${routes.messagesPath()}/${id}`, { body })
      return response.data
    }
    catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',
  async (messageId, { rejectWithValue }) => {
    try {
      await api.delete(`${routes.messagesPath()}/${messageId}`)
      return { id: messageId }
    }
    catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const initialState = {
  messages: [],
  loading: false,
  error: null,
  sending: false,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      const exists = state.messages.find(msg => msg.id === payload.id)
      if (!exists) {
        state.messages.push(payload)
      }
    },
    updateMessage: (state, { payload }) => {
      const index = state.messages.findIndex(msg => msg.id === payload.id)
      if (index !== -1) {
        state.messages[index] = payload
      }
    },
    removeMessage: (state, { payload }) => {
      state.messages = state.messages.filter(msg => msg.id !== payload.id)
    },
    clearMessages: (state) => {
      state.messages = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.loading = false
        state.messages = payload
      })
      .addCase(fetchMessages.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.sending = false
      })
      .addCase(sendMessage.rejected, (state, { payload }) => {
        state.sending = false
        state.error = payload
      })
      .addCase(removeChannel, (state, { payload }) => {
        state.messages = state.messages.filter(msg => msg.channelId !== payload.id)
      })
  },
})

export const {
  addMessage,
  updateMessage,
  removeMessage,
  clearMessages,
} = messagesSlice.actions

export default messagesSlice.reducer
