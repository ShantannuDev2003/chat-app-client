import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@fontsource-variable/inter";
import App from './App.jsx'
import { Toaster } from "@/components/ui/sonner"
import { SocketProvider } from './context/SocketContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <SocketProvider>
    <App />
    <Toaster closeButton />
  </SocketProvider>
  // </StrictMode>,
)
