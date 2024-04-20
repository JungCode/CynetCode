import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  userId: "",
  userIdHandler: () => {},
  userItems: [],
  userItemsHandler: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      if (storedToken) {
        setAuthToken(storedToken);
        setUserId(userId);
      }
    }
    fetchToken();
  }, []);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
  }

  function userIdHandler(userId) {
    setUserId(userId);
    AsyncStorage.setItem("userId", userId);
  }
  function userItemsHandler(item) {
    setUserItems(item);
  }
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    userId: userId,
    userIdHandler: userIdHandler,
    userItems: userItems,
    userItemsHandler: userItemsHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
