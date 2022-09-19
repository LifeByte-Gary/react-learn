import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css'
import './index.css'
import { Provider } from 'react-redux'
import axios from 'axios'
import { PersistGate } from 'redux-persist/integration/react'
import store from '@/redux/store'
import { Spin } from 'antd'

axios.defaults.headers['x-icode'] = 'B69564A89793816C'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store.store}>
      <PersistGate
        loading={<Spin />}
        persistor={store.persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
