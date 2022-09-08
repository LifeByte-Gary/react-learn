import { createStore } from 'redux'
import languageReducer from '@/redux/language/reducer'

const store = createStore(languageReducer)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
