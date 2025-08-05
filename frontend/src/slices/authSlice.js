import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.token = payload.token
      state.username = payload.username
      localStorage.setItem('token', payload.token)
      localStorage.setItem('username', payload.username)
    },
    logout: (state) => {
      state.token = null
      state.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
