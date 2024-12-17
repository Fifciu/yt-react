import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import GuestHome from './pages/GuestHome.jsx'
import OAuthCallback from './pages/OAuthCallback.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import UserHome from './pages/UserHome.jsx';
import UserShorts from './pages/UserShorts.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import UserSubscriptions from './pages/UserSubscriptions.jsx'
import UserMe from './pages/UserMe.jsx'
import "@fontsource-variable/roboto-flex";
import UIContextProvider from '@/components/context/UIContext';
import SearchResults from './pages/SearchResults.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UIContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<GuestHome />} />
            <Route path="oauthCallback" element={<OAuthCallback />} />

            <Route path="app" element={<AuthLayout />}>
              <Route index element={<UserHome />} />
              <Route path="shorts" element={<UserShorts />} />
              <Route path="subscriptions" element={<UserSubscriptions />} />
              <Route path="me" element={<UserMe />} />
              <Route path="search-results" element={<SearchResults />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UIContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
