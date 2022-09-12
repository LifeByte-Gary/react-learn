import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css'
import './index.css'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'

axios.defaults.headers['x-icode'] = 'B69564A89793816C'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
