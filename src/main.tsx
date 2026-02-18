import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/variables.css'
import App from './App.tsx'

import {MemoryRouter} from "react-router-dom";
// import {BrowserRouter} from "react-router-dom";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      {/* TODO: BROWSER ROUTER FIX */}
      <MemoryRouter initialEntries={["/"]}>
          <App/>
      </MemoryRouter>
  </StrictMode>,
)
