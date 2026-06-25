import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import router from './routes/Router';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { SessionProvider } from './contexts/SessionContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="450175706498-5las6c0b0apcno1k8eriu41s0crfo066.apps.googleusercontent.com">
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </GoogleOAuthProvider>
  </StrictMode >,
)
