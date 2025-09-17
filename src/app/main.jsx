import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../assets/css/index.css'
import { AppRoutes } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const qclient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={qclient}>
        <AppRoutes />
    </QueryClientProvider>
  </StrictMode>,
) 
