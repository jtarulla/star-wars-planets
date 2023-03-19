import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import store from './infrastructure/store'

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement!)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
