import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
      state.channels.push(payload);
    },
    updateChannel: (state, { payload }) => {
      const index = state.channels.findIndex(ch => ch.id === payload.id);
      if (index !== -1) {
        state.channels[index] = payload;
      }
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter(ch => ch.id !== payload.id);

      if (state.currentChannelId === payload.id) {
        state.currentChannelId = state.channels[0]?.id || null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.channels = payload;
      
        if (!state.currentChannelId && payload.length > 0) {
          state.currentChannelId = payload[0].id;
        }
      })
      .addCase(fetchChannels.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createChannel.fulfilled, (state, { payload }) => {
        state.channels.push(payload);
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
