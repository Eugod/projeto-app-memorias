import React, { useState } from 'react';

export const MainContext = React.createContext();

export const MainContextProvider = ({ children }) => {
  const [vetorMemorias, setVetorMemorias] = useState([]);

  return (
    <MainContext.Provider
      value={{
        vetorMemorias,
        setVetorMemorias,
      }}>
      {children}
    </MainContext.Provider>
  );
};
