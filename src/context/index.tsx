import React from 'react';

import { UserContextProvider } from './user';

const GlobalContext: React.FC = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>
}

export default GlobalContext;