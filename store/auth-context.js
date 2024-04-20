import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  userId: "",
  userIdHandler: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken(null);
  }

  function userIdHandler(userId) {
    setUserId(userId);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    userId: userId,
    userIdHandler: userIdHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
