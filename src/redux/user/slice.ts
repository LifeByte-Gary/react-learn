import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface UserState {
  loading: boolean
  error: string | null
  token: string | null
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null
}

export const signIn = createAsyncThunk(
  'users/signIn',
  async (
    params: {
      email: string
      password: string
    },
    thunkAPI
  ) => {
    const { data } = await axios.post('http://123.56.149.216:8080/auth/login', {
      email: params.email,
      password: params.password
    })

    return data.token
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false
      state.error = null
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = null
        state.token = payload
      })
      .addCase(signIn.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message as string
      })
  }
})
