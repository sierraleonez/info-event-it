"use client";
import { Box } from "@mui/material";
import { usePathname, redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { PROTECTED_ROUTE, STORAGE_KEY } from '@/constants/index'

export const AuthContext = createContext({
  authorized: false,
  logout: () => {},
});

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const path = usePathname();
  
  function logout() {
    localStorage.removeItem(STORAGE_KEY.access_token);
    setAuthorized(false);
  }
  
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.access_token);
    if (PROTECTED_ROUTE.includes(path)) {
      if (token) {
        setAuthorized(true);
      } else {
        redirect("/login");
      }
      return;
    } else {
      setAuthorized(true);
    }
    return () => console.log('cleanup')
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ authorized, logout: logout }}>
      {authorized ? children : <Box>Unauthorized</Box>}
    </AuthContext.Provider>
  );
}
