import { combineReducers, createStore } from 'redux'
import languageReducer from '@/redux/language/reducer'
import recommendedProductsReducer from '@/redux/recommendedProducts/recommendedProductsReducer'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendedProducts: recommendedProductsReducer
})

const store = createStore(rootReducer)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
