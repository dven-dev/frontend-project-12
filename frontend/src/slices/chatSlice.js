import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchChannels = createAsyncThunk(
  'chat/fetchChannels',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/v1/channels', {
        headers: getAuthHeader(),
      });
      return response.data.channels;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (channelId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/v1/channels/${channelId}/messages`, {
        headers: getAuthHeader(),
      });
      return { channelId, messages: response.data.messages };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messagesByChannel: {},
    currentChannelId: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const channels = Array.isArray(action.payload) ? action.payload : [];
        state.channels = channels;
        if (!state.currentChannelId && channels.length > 0) {
          state.currentChannelId = channels[0].id;
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loadingMessages';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeededMessages';
        const { channelId, messages } = action.payload;
        state.messagesByChannel[channelId] = messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failedMessages';
        state.error = action.payload;
      });
  },
});

export const { setCurrentChannel } = chatSlice.actions;
export default chatSlice.reducer;
