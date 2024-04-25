import React from 'react';

// Creates a Context object
const UserContext = React.createContext();

export const UserProvider = UserContext.Provider;

export default UserContext;