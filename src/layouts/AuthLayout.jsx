import { Outlet, useLocation } from 'react-router';
import OAuthContextProvider from '../components/context/OAuthContext';
import UserContextProvider from '../components/context/UserContext';
import Header from '@/components/Header';
import ToolBar from '@/components/ToolBar';
import classes from './AuthLayout.module.css';
import MobileSearch from '../components/MobileSearch/MobileSearch';

const HIDE_TOOLBAR_ROUTES = [
  '/app/shorts'
]

function AuthLayout() {
  const location = useLocation();
  const shouldShowToolbar = !HIDE_TOOLBAR_ROUTES.includes(location.pathname);

  return (
    <>
      <OAuthContextProvider>
        <UserContextProvider>
          <div className={classes.headerWrapper}>
            <Header></Header>
            <MobileSearch></MobileSearch>
          </div>
          <div className={classes.routeWrapper}>
            <Outlet />
          </div>
          <div className={classes.toolbarWrapper}>
            {shouldShowToolbar && <ToolBar />}
          </div>
        </UserContextProvider>
      </OAuthContextProvider>
    
    </>
  )
}

export default AuthLayout;
