import React, {createContext, useState, useContext} from 'react';

const LayoutDataContext = createContext();

export const LayoutDataProvider = ({children}) => {
  const [layoutData, setLayoutData] = useState({});

  // Function to update layout data
  const updateLayoutData = (key, data) => {
    setLayoutData(prevData => ({...prevData, [key]: data}));
  };

  return (
    <LayoutDataContext.Provider value={{layoutData, updateLayoutData}}>
      {children}
    </LayoutDataContext.Provider>
  );
};

export const useLayoutData = () => useContext(LayoutDataContext);
