import { request } from "../utils/axiosInstance";
import { RegisterPayload } from "./user.type";

export const RegisterRequest = (data: RegisterPayload) =>
    request({
        url: '/users/create',
        data,
        method: 'POST',
    })