import { createContext, PropsWithChildren, useContext } from "react";

import { useStorageState } from "./useStorageState";

const AuthContext = createContext<{
  session?: string | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}>({
  session: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
});

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const login = () => {
    setSession("guest");
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
