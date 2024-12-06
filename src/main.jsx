import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import GuestHome from './pages/GuestHome.jsx'
import OAuthCallback from './pages/OAuthCallback.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import UserHome from './pages/UserHome.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route index element={<GuestHome />} />
        <Route path="oauthCallback" element={<OAuthCallback />} />

        <Route path="app" element={<AuthLayout />}>
          <Route index element={<UserHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
