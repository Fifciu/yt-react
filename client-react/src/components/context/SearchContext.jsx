import React from 'react';
import { useState } from 'react';

export const SearchContext = React.createContext();

export default function SearchContextProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      {children}
    </SearchContext.Provider>
  );
}