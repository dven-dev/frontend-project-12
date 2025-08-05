import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApiUrl } from '../services/apiUtils.js'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token')

      const response = await fetch(`${getApiUrl()}/channels`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error('Failed to fetch channels')
      const data = await response.json()
      return Array.isArray(data) ? data : data.channels || []
    }
    catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (channelData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}/channels`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(channelData),
      })

      if (!response.ok) throw new Error('Failed to create channel')
      return await response.json()
    }
    catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}/channels/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) throw new Error('Failed to rename channel')
      return await response.json()
    }
    catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (channelId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}/channels/${channelId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error('Failed to delete channel')
      return { id: channelId }
    }
    catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const initialState = {
  channels: [],
  currentChannelId: null,
  loading: false,
  error: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload
    },
    addChannel: (state, { payload }) => {
      const exists = state.channels.find(ch => ch.id === payload.id)
      if (!exists) {
        state.channels.push(payload)
      }
    },
    updateChannel: (state, { payload }) => {
      const index = state.channels.findIndex(ch => ch.id === payload.id)
      if (index !== -1) {
        state.channels[index] = payload
      }
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter(ch => ch.id !== payload.id)
      if (state.currentChannelId === payload.id) {
        const generalChannel = state.channels.find(ch => ch.name === 'general')
        state.currentChannelId = generalChannel?.id || state.channels[0]?.id || null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.loading = false
        state.channels = payload
        if (!state.currentChannelId && payload.length > 0) {
          const generalChannel = payload.find(ch => ch.name === 'general')
          state.currentChannelId = generalChannel?.id || payload[0].id
        }
      })
      .addCase(fetchChannels.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(createChannel.fulfilled, (state, { payload }) => {
        state.currentChannelId = payload.id
      })
      .addCase(renameChannel.fulfilled, () => {
      })
      .addCase(deleteChannel.fulfilled, () => {
      })
  },
})

export const {
  setCurrentChannelId,
  addChannel,
  updateChannel,
  removeChannel,
} = channelsSlice.actions

export default channelsSlice.reducer
