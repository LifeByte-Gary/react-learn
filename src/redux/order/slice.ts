import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { checkout } from '@/redux/shoppingCart/slice'

interface OrderState {
  loading: boolean
  error: string | null
  currentOrder: any
}

const initialState: OrderState = {
  loading: true,
  error: null,
  currentOrder: null
}

export const placeOrder = createAsyncThunk('orders/place', async (params: { jwt: string; orderId: string }) => {
  const { data } = await axios.post(`http://123.56.149.216:8080/api/orders/${params.orderId}/placeOrder`, null, {
    headers: {
      Authorization: `bearer ${params.jwt}`
    }
  })

  return data
})

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Place order */
      .addCase(placeOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(placeOrder.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = null
        state.currentOrder = payload
      })
      .addCase(placeOrder.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message ?? null
      })

      /* Checkout */
      .addCase(checkout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkout.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = null
        state.currentOrder = payload
      })
      .addCase(checkout.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message ?? null
      })
  }
})
