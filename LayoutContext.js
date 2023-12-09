import React, {createContext, useState, useContext} from 'react';

const LayoutDataContext = createContext();

export const LayoutDataProvider = ({children}) => {
  const [layoutData, setLayoutData] = useState([]);

  const updateLayoutData = layoutInfo => {
    setLayoutData(prevData => [...prevData, layoutInfo]);
  };

  return (
    <LayoutDataContext.Provider value={{layoutData, updateLayoutData}}>
      {children}
    </LayoutDataContext.Provider>
  );
};

export const useLayoutData = () => useContext(LayoutDataContext);
