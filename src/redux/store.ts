import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { actionLog } from '@/redux/middlewares/actionLog'
import { productSearchSlice } from '@/redux/productSearch/slice'
import { recommendedProductsSlice } from '@/redux/recommendedProducts/slice'
import { productDetailSlice } from '@/redux/productDetail/slice'
import { languageSlice } from '@/redux/language/slice'
import { userSlice } from '@/redux/user/slice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { shoppingCartSlice } from '@/redux/shoppingCart/slice'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  language: languageSlice.reducer,
  recommendedProducts: recommendedProductsSlice.reducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(actionLog),
  devTools: true
})

const persistor = persistStore(store)

export default { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
