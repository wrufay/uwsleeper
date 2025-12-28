import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './Main.tsx'
import Nav from './Nav.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Nav />
    <Main />
  </StrictMode>
)
