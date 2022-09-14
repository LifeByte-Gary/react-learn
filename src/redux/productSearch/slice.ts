import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface productSearchState {
  loading: boolean
  error: string | undefined
  data: any
  pagination: any
}

const initialState: productSearchState = {
  loading: true,
  error: undefined,
  data: [],
  pagination: undefined
}

export const searchProduct = createAsyncThunk('products/search', async (params: { keyword: string; nextPage: number | string; pageSize: number | string }) => {
  const { keyword, pageSize, nextPage } = params
  const url = `http://123.56.149.216:8080/api/touristRoutes?pagenumber=${nextPage}&pagesize=${pageSize}` + (keyword !== '' ? `&keyword=${keyword}` : '')
  const response = await axios.get(url)

  return {
    data: response.data,
    pagination: JSON.parse(response.headers['x-pagination'])
  }
})

export const productSearchSlice = createSlice({
  name: 'productsSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(searchProduct.fulfilled, (state, { payload }) => {
        state.data = payload.data
        state.pagination = payload.pagination
        state.loading = false
        state.error = undefined
      })
      .addCase(searchProduct.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message
      })
  }
})
