import React, { createContext, useState, useEffect } from "react";
import api from "../axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

 const fetchUser = async () => {
  try {
    const res = await api.get("/api/user");
    setUser(res.data);
  } catch (err) {
    console.error("fetchUser failed:", err.response?.data || err.message);
    setUser(null);
  } finally {
    setChecked(true);
  }
};


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, checked }}>
      {children}
    </AuthContext.Provider>
  );
}
