import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import { Home } from './pages/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const qclient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={qclient}>
      <div className='bg-stone-100 text-stone-900 w-full'>
        <Home />
      </div>
    </QueryClientProvider>
  </StrictMode>,
)
