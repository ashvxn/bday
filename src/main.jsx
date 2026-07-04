import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import Redirect from './Redirect.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Redirect />
    <Analytics />
  </StrictMode>,
)
