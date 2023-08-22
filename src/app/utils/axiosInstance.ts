import axiosClient, { Axios, AxiosRequestConfig } from "axios";

const client = axiosClient.create()
export const axios = new Axios({
    baseURL: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: ''
    
})
type RequestOptions = {
    headers: { [key: string]: string };

}
export const request = async function(options: AxiosRequestConfig) {
    // const onSuccess = ()
    const reqOpt = {
        baseURL: 'http://localhost:3001',
        ...options,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options.headers,
    },
    }

    return client(reqOpt)
        .then(r => r)
        .catch(err => {throw new Error(err)})
}

// Axios.


// axios.interceptors.response.use(res => {
//     if (!res.data.success) {
//         throw new Error('request failed')
//     }

//     return res
    
// }, err => {
//     console.log(err)
// })
