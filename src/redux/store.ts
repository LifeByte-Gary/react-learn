import { combineReducers } from 'redux'
import languageReducer from '@/redux/language/reducer'
import { productDetailSlice } from '@/redux/productDetail/slice'
import { configureStore } from '@reduxjs/toolkit'
import { actionLog } from '@/redux/middlewares/actionLog'
import { productSearchSlice } from '@/redux/productSearch/slice'
import { recommendedProductsSlice } from '@/redux/recommendedProducts/slice'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendedProducts: recommendedProductsSlice.reducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer
})

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
  devTools: true
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
