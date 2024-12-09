import React from 'react';
import { LS_OAUTH_DATA } from '../../const';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';

export const OAuthContext = React.createContext();

export default function OAuthContextProvider({ children }) {
  const oauthData = window.localStorage.getItem(LS_OAUTH_DATA);
  const params = new URLSearchParams(oauthData);
  const at = params.get('access_token');
  const [accessToken, ] = useState(at);

  return (
    <OAuthContext.Provider value={accessToken}>
      {children}
    </OAuthContext.Provider>
  );
}