import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals/main.css'
import { PizzaDRuaProvider } from './context/context-app.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PizzaDRuaProvider>
      <App />
    </PizzaDRuaProvider>
  </React.StrictMode>,
)
