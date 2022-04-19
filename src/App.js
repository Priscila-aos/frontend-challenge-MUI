import { BrowserRouter, Link } from 'react-router-dom'

import './estilizando.css'
import Rota from './routes/Router'

//componente app -NÃO é uma função
function App() {
  return (
    <BrowserRouter>
      <Rota />
    </BrowserRouter>
  )
}

export default App
