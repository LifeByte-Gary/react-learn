import { applyMiddleware, combineReducers, createStore } from 'redux'
import languageReducer from '@/redux/language/reducer'
import recommendedProductsReducer from '@/redux/recommendedProducts/reducer'
import thunk from 'redux-thunk'
import { actionLog } from '@/redux/middlewares/actionLog'
import { productDetailSlice } from '@/redux/productDetail/slice'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendedProducts: recommendedProductsReducer,
  productDetail: productDetailSlice.reducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
