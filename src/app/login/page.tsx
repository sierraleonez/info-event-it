"use client"
import { Button, Paper, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form";
import useRequest from "@/components/hooks/useRequest";
import { useRouter, redirect } from "next/navigation";
import { STORAGE_KEY } from "@/constants";

type RegisterInput = {
    email: string;
    password: string;
}

export default function LoginPage() {
    const { user } = useRequest()
    const router = useRouter()
    const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
        try {
            const res = await user.login(data)
            if (res?.data?.data) {
                localStorage.setItem(STORAGE_KEY.access_token, res?.data.data?.token)
                router.push("/dashboard")

            }
        } catch (err) {
            console.log(err)
        }
    }
    const { register, handleSubmit } = useForm<RegisterInput>()
    return (
        <div className="w-full h-min-screen">
            <div className="flex justify-center items-center">
                <Paper className="p-24 w-fit grid gap-y-4">
                    <Typography>Login</Typography>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-3">
                        <TextField {...register('email', { required: true })} type="email" label="Email"/>
                        <TextField {...register('password', { required: true })} type="password" label="Password"/>
                        <Button type="submit" variant="outlined">Submit</Button>
                    </form>
                </Paper>

            </div>
        </div>
    )
}