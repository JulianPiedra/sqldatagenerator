import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './css/index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
