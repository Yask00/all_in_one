import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import useCookie from "../hooks/useCookie";
import { User } from "../types/interfaces";

const AuthContext = createContext<{
  token: string | undefined;
  setToken: (newToken: string) => void;
  user: User | undefined;
  setUser: (user: User) => void;
}>({
  token: undefined,
  setToken: () => {},
  user: undefined,
  setUser: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, getCookie, updateCookie, deleteCookie] = useCookie("jwt") as [
    string,
    (name: string) => string | undefined,
    (newValue: string, options?: Cookies.CookieAttributes) => void,
    (name: string) => void,
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userCookie, getUserCookie, updateUserCookie, deleteUserCookie] =
    useCookie("user") as [
      string,
      (name: string) => string | undefined,
      (newValue: string, options?: Cookies.CookieAttributes) => void,
      (name: string) => void,
    ];

  const [token, setToken_] = useState(getCookie("jwt"));
  const [user, setUser_] = useState<User | undefined>(() => {
    const userCookie = getUserCookie("user");
    return userCookie ? JSON.parse(userCookie) : undefined;
  });

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  const setUser = (user: User) => {
    if (!user) {
      return;
    }
    setUser_(user);
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
