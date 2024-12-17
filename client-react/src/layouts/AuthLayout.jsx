import { Outlet, useLocation } from 'react-router';
import OAuthContextProvider from '../components/context/OAuthContext';
import UserContextProvider from '../components/context/UserContext';
import Header from '@/components/Header';
import ToolBar from '@/components/ToolBar';
import classes from './AuthLayout.module.css';
import MobileSearch from '../components/MobileSearch/MobileSearch';
import SearchContextProvider from '../components/context/SearchContext';
import { UIContext } from '../components/context/UIContext';
import React from 'react';

const HIDE_TOOLBAR_ROUTES = [
  '/app/shorts'
]

function AuthLayout() {
  const location = useLocation();
  const shouldShowToolbar = !HIDE_TOOLBAR_ROUTES.includes(location.pathname);
  const { isMobileSearchOpen } = React.useContext(UIContext);

  return (
    <>
        <OAuthContextProvider>
          <UserContextProvider>
            <SearchContextProvider>
              <div className={classes.headerWrapper}>
                {isMobileSearchOpen
                  ? <MobileSearch></MobileSearch>
                  : <Header></Header>
                }
              </div>
            </SearchContextProvider>
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
