import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface ShoppingCartState {
  loading: boolean
  error: string | null
  items: any[]
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: []
}

export const fetchShoppingCart = createAsyncThunk('shoppingCart/show', async (jwt: string) => {
  const { data } = await axios.get('http://123.56.149.216:8080/api/shoppingCart', {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })

  return data.shoppingCartItems
})

export const addShoppingCartItem = createAsyncThunk('shoppingCart/add', async (params: { jwt: string; touristRouteId: string }) => {
  const { data } = await axios.post(
    'http://123.56.149.216:8080/api/shoppingCart/items',
    {
      touristRouteId: params.touristRouteId
    },
    {
      headers: {
        Authorization: `bearer ${params.jwt}`
      }
    }
  )

  return data.shoppingCartItems
})

export const clearShoppingCart = createAsyncThunk('shoppingCart/clear', async (params: { jwt: string; ids: number[] }) => {
  return await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${params.ids.join(',')})`, {
    headers: {
      Authorization: `bearer ${params.jwt}`
    }
  })
})

export const checkout = createAsyncThunk('shoppingCart/checkout', async (jwt: string) => {
  return await axios.post('http://123.56.149.216:8080/api/shoppingCart/checkout', null, {
    headers: {
      Authorization: `bearer ${jwt}`
    }
  })
})

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Fetch shopping cart */
      .addCase(fetchShoppingCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShoppingCart.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = null
        state.items = payload
      })
      .addCase(fetchShoppingCart.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message ?? null
      })

      /* Add shopping cart item */
      .addCase(addShoppingCartItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addShoppingCartItem.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = null
        state.items = payload
      })
      .addCase(addShoppingCartItem.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message ?? null
      })

      /* Clear shopping cart */
      .addCase(clearShoppingCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(clearShoppingCart.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.items = []
      })
      .addCase(clearShoppingCart.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message ?? null
      })

      /* Checkout */
      .addCase(checkout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkout.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.items = []
      })
      .addCase(checkout.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message ?? null
      })
  }
})
