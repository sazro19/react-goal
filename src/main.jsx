import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import Trail from "./trail/Trail.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Trail/>
  </StrictMode>,
)
