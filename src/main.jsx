import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/variables.css'

import App from './App.jsx'

import {MemoryRouter} from "react-router-dom";

const params = new URLSearchParams(window.location.search);
const startPath = params.get("start") || "/";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MemoryRouter initialEntries={[startPath]}>
            <App/>
        </MemoryRouter>
    </StrictMode>,
)