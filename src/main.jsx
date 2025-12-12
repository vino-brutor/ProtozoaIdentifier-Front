import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// importa o provider do google para react
import { GoogleOAuthProvider } from '@react-oauth/google'

// como estamos no fron, usamos import.meta.env ao inves do process.env, só é reconhecido no node
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}> {/*criamos um GoogleOAuthProvider com o clientId do projeto para q o resto do projetio reconheça o google */}
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
