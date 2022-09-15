import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface recommendedProductsState {
  loading: boolean
  error: string | undefined
  productList: any[]
}

const initialState: recommendedProductsState = {
  loading: true,
  error: undefined,
  productList: []
}

export const fetchRecommendedProducts = createAsyncThunk('recommendedProducts/index', async () => {
  const { data } = await axios.get('http://123.56.149.216:8080/api/productCollections')

  return data
})

export const recommendedProductsSlice = createSlice({
  name: 'recommendedProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedProducts.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchRecommendedProducts.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = undefined
        state.productList = payload
      })
      .addCase(fetchRecommendedProducts.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message
      })
  }
})
