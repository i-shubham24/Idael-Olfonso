import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './App'
import './styles/index.css'
import { isSoftwareGL } from './lib/gpu'

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
if (isSoftwareGL()) document.documentElement.classList.add('low-gpu')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
