import { BrowserRouter } from "react-router-dom"
import { Router } from "./Routes"
import { Header } from "./components/Header"

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  )
}

export default App
