import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const container = document.getElementById('root')!

const appContent = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

if (container.hasChildNodes()) {
  // Our prerenderer saves browser-rendered DOM, not React server-rendered HTML.
  // Mount a fresh tree and replace its snapshot metadata to avoid hydration
  // failures and duplicate canonical/description tags after route changes.
  document.head.querySelectorAll(
    'title, link[rel="canonical"], meta[name="description"], meta[name="application-name"], meta[name="robots"], meta[name="keywords"], meta[property^="og:"], meta[property^="article:"], meta[name="twitter:card"], meta[name="twitter:title"], meta[name="twitter:description"], meta[name="twitter:image"], script[type="application/ld+json"]',
  ).forEach((node) => node.remove())
}

createRoot(container).render(appContent)
