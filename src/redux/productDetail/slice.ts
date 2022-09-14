import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface ProductDetailState {
  loading: boolean
  error: string | undefined
  product: any
}

const initialState: ProductDetailState = {
  loading: true,
  error: undefined,
  product: []
}

export const getProductDetail = createAsyncThunk('productDetail/getProductDetail', async (id: string) => {
  const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${id}`)

  return data
})

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.error = undefined
      state.product = action.payload
    },
    fetchError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.product = action.payload
      state.loading = false
      state.error = undefined
    })
    builder.addCase(getProductDetail.rejected, (state, action) => {
      state.error = action.error.message
      state.loading = false
    })
  }
})
