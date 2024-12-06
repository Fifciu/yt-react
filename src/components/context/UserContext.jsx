import React from 'react';
import { LS_OAUTH_DATA } from '../../const';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { OAuthContext } from './OAuthContext';
import { useQuery } from '@tanstack/react-query';
import { axios } from '../../axios';

const UserContext = React.createContext();

export default function UserContextProvider({ children }) {
  const accessToken = React.useContext(OAuthContext);
  const { status, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return axios.get(`/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${accessToken}`);
    }
  });

  if (status === 'pending') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
    <UserContext.Provider value={accessToken}>
      <div>{JSON.stringify(data)}</div>
      {children}
    </UserContext.Provider>
  );
}