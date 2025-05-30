import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import { Home } from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-stone-100 p-2 text-stone-900'>
      <Home />
    </div>
  </StrictMode>,
)
