import { request } from "@/app/utils/axiosInstance";
import axiosClient, { AxiosRequestConfig } from "axios";
import { useCallback, useContext } from "react";
import { SnackContext } from "../providers/snack-provider";
import QueryString from "qs";

const client = axiosClient.create();

export default function useRequest() {
  const snackContext = useContext(SnackContext);

  function createRequest(
    options: AxiosRequestConfig,
    successMessage: string = "Operation success",
    errorMessage: string = "Operation failed"
  ) {
    return async function w3<T>(data?: T, params?: T) {
      try {
        const res = await request({ ...options, data, params });
        snackContext.openSnackBar({ message: successMessage });
        return res;
      } catch (err: any) {
        snackContext.openSnackBar({ message: errorMessage });
        throw new Error(err);
      }
    };
  }
  // eslint-disable-next-line
	const mCreateReq = useCallback(createRequest, [])

  return {
    user: {
      register:
        mCreateReq({
          url: "/users/create",
          method: "POST",
        }),
			login:
				mCreateReq({
					url: "/users/login",
					method: "POST"
				})
    },
    events: {},
  };
}
