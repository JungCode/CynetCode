import { createContext, useState } from "react";
import { webStoreItem } from "../util/http";

export const ItemContext = createContext({
  webStoreItem: webStoreItem
});

function ItemContextProvider({ children }) {

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
