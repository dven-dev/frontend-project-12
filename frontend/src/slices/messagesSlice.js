import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');

      const response = await fetch('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch messages');
      
      const data = await response.json();
      return Array.isArray(data) ? data : data.messages || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  messages: [],
  loading: false,
  error: null,
  sending: false,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      const exists = state.messages.find(msg => msg.id === payload.id);
      if (!exists) {
        state.messages.push(payload);
      }
    },
    updateMessage: (state, { payload }) => {
      const index = state.messages.findIndex(msg => msg.id === payload.id);
      if (index !== -1) {
        state.messages[index] = payload;
      }
    },
    removeMessage: (state, { payload }) => {
      state.messages = state.messages.filter(msg => msg.id !== payload.id);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.messages = payload;
      })
      .addCase(fetchMessages.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(sendMessage.rejected, (state, { payload }) => {
        state.sending = false;
        state.error = payload;
      })
      .addCase(removeChannel, (state, { payload }) => {
        state.messages = state.messages.filter(msg => msg.channelId !== payload.id);
      });
  },
});

export const { 
  addMessage, 
  updateMessage, 
  removeMessage, 
  clearMessages 
} = messagesSlice.actions;

export default messagesSlice.reducer;
