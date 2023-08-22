"use client";
import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../providers/route-guard";

export default function NavBar() {
  const authContext = useContext(AuthContext);
  console.log(authContext.authorized)
  return (
    <Box className="fixed w-full flex justify-between px-32 py-4 bg-[#4d4d4d]">
      <Box className="flex items-center">
        <Typography className="font-bold text-white">INFO EVENT IT</Typography>
      </Box>
      <Box className="flex gap-x-3">
        {authContext.authorized ? (
          <Button variant="text" onClick={authContext.logout}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="text" className="font-bold text-white">
              LOGIN
            </Button>
            <Button variant="text" className="font-bold text-white">
              REGISTER
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
