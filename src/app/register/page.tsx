"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import qs from "qs";

import { SubmitHandler, useForm } from "react-hook-form";
import { axios, request } from "../utils/axiosInstance";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useState } from "react";
import { SnackContext } from "@/components/providers/snack-provider";
import { RegisterPayload } from "../modules/user.type";
import { RegisterRequest } from "../modules/user.api";
import useRequest from "@/components/hooks/useRequest";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { user } = useRequest()
  const router = useRouter()
  const { register, handleSubmit } = useForm<RegisterPayload>();
  const [visibility, setVisibility] = useState<Boolean>(false);
  const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
    try {
      const res = await user.register(data)
      router.push('/login')
  } catch (err) {
    console.log(err)
  }}


  return (
    <div className="w-full h-min-screen">
      <div className="flex justify-center items-center">
        <Paper className="p-24 w-fit grid gap-y-4">
          <Typography>Register</Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-3">
            <TextField
              type="email"
              label="Email"
              {...register("email", { required: true })}
            />
            <TextField
              type="text"
              label="Username"
              {...register("username", { required: true })}
            />
            <TextField
              type={visibility ? "text" : "password"}
              label="Password"
              {...register("password", { required: true })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setVisibility(!visibility)}>
                      {visibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}
