import { createStore } from 'redux'
import languageReducer from '@/redux/language.reducer'

const store = createStore(languageReducer)

export default store
