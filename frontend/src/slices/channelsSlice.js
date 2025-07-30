// slices/channelsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk для загрузки каналов
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');

      const response = await fetch('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch channels');
      
      const data = await response.json();
      return Array.isArray(data) ? data : data.channels || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk для создания канала
export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (channelData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/channels', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(channelData),
      });

      if (!response.ok) throw new Error('Failed to create channel');
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk для переименования канала
export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/channels/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error('Failed to rename channel');
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk для удаления канала
export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (channelId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/channels/${channelId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete channel');
      
      return { id: channelId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  channels: [],
  currentChannelId: null,
  loading: false,
  error: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      // Проверяем, что канал еще не существует
      const exists = state.channels.find(ch => ch.id === payload.id);
      if (!exists) {
        state.channels.push(payload);
      }
    },
    updateChannel: (state, { payload }) => {
      const index = state.channels.findIndex(ch => ch.id === payload.id);
      if (index !== -1) {
        state.channels[index] = payload;
      }
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter(ch => ch.id !== payload.id);
      // Если удаляется текущий канал, переключаемся на первый
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = state.channels[0]?.id || null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка каналов
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.channels = payload;
        // Устанавливаем первый канал как текущий, если не выбран
        if (!state.currentChannelId && payload.length > 0) {
          state.currentChannelId = payload[0].id;
        }
      })
      .addCase(fetchChannels.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Создание канала - НЕ добавляем канал здесь, он придет через WebSocket
      .addCase(createChannel.fulfilled, (state, { payload }) => {
        // Переключаемся на созданный канал (он уже будет добавлен через WebSocket)
        state.currentChannelId = payload.id;
      })
      // Переименование канала - НЕ обновляем канал здесь, он придет через WebSocket
      .addCase(renameChannel.fulfilled, (state) => {
        // Ничего не делаем, обновление придет через WebSocket
      })
      // Удаление канала - НЕ удаляем канал здесь, он придет через WebSocket
      .addCase(deleteChannel.fulfilled, (state) => {
        // Ничего не делаем, удаление придет через WebSocket
      });
  },
});

export const { 
  setCurrentChannelId, 
  addChannel, 
  updateChannel, 
  removeChannel 
} = channelsSlice.actions;

export default channelsSlice.reducer;
