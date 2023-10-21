import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals/main.css'
import { PizzaDRuaProvider } from './context/context-app.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PizzaDRuaProvider>
    <App />
  </PizzaDRuaProvider>
)
