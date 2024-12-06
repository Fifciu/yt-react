import './AuthLayout.css'
import { Outlet } from 'react-router';
import OAuthContextProvider from '../components/context/OAuthContext';
import UserContextProvider from '../components/context/UserContext';

function AuthLayout() {
  return (
    <>
      <OAuthContextProvider>
        <UserContextProvider>
        xd
        <Outlet />
        </UserContextProvider>
      </OAuthContextProvider>
    
    </>
  )
}

export default AuthLayout;
