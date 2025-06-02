import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import { Home } from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-stone-100 text-stone-900 w-full p-2'>
      <Home />
    </div>
  </StrictMode>,
)
