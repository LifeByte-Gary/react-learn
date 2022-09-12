import { applyMiddleware, combineReducers, createStore } from 'redux'
import languageReducer from '@/redux/language/reducer'
import recommendedProductsReducer from '@/redux/recommendedProducts/recommendedProductsReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendedProducts: recommendedProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
