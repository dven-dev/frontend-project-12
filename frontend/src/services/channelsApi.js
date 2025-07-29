import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
