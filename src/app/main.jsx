import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../assets/css/index.css'
import { AppRoutes } from './routes'
import { AppProvider } from './contextProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
        <AppRoutes />
    </AppProvider>
  </StrictMode>,
) 
