import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Note: React StrictMode intentionally double-invokes effects in dev mode,
// which causes WebGL context creation failures with Three.js.
// Removed StrictMode for WebGL compatibility (standard practice for Three.js apps).
createRoot(document.getElementById('root')).render(
  <App />
)
