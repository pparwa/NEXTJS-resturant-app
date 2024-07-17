"use client"

import React, { createContext, useState } from 'react';

interface User {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  city: string,
}

interface State {
  loading: boolean,
  data: User | null,
  error: string | null,
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {}
});

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  let [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null
  });

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}