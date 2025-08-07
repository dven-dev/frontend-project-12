import { createAsyncThunk } from '@reduxjs/toolkit'
import api from './axiosConfig.js'
import routes from '../routes.js'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(routes.dataPath())
      return response.data
    }
    catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)
