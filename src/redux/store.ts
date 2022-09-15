import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { actionLog } from '@/redux/middlewares/actionLog'
import { productSearchSlice } from '@/redux/productSearch/slice'
import { recommendedProductsSlice } from '@/redux/recommendedProducts/slice'
import { productDetailSlice } from '@/redux/productDetail/slice'
import { languageSlice } from '@/redux/language/slice'

const rootReducer = combineReducers({
  language: languageSlice.reducer,
  recommendedProducts: recommendedProductsSlice.reducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
  devTools: true
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
