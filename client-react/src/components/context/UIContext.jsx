import React from 'react';
import { useState } from 'react';

export const UIContext = React.createContext();

export default function UIContextProvider({ children }) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <UIContext.Provider value={{isMobileSearchOpen, setIsMobileSearchOpen}}>
      {children}
    </UIContext.Provider>
  );
}