import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { Home } from './Components/Home.jsx'
// import { HomeRender } from './Components/useFetch.jsx'
import { Login } from './Components/Login.jsx'
import { Rs } from './Components/Routers.jsx'
// import { ModalDemo } from './Modals/Modal.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rs/>
  </StrictMode>,
)
