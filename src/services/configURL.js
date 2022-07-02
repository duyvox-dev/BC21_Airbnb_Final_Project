import axios from "axios";
import { localStorageService } from "./localService";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const TOKEN_CYBERSOFT = process.env.REACT_APP_CYBERSOFT_TOKEN;
let timeRequestMax;

const getAccessToken = () => {
    let userLogin = localStorageService.getUserLocal();
    if (userLogin) {
        return userLogin.accessToken;
    } else {
        return null;
    }
};
const getRequestConfig = () => {
    const config = {
        headers: {
            tokenByClass: TOKEN_CYBERSOFT,
        },
    };
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers.token = accessToken;
    }
    return config;
};
export const httpService = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * timeRequestMax,
    // headers: {
    //     tokenByClass: TOKEN_CYBERSOFT,
    //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTJmMGQ5M2ExODAxNTAwMWMwMTFkMDQiLCJlbWFpbCI6ImtoYTl4MDE1OUBnbWFpbC5jb20iLCJ0eXBlIjoiQ0xJRU5UIiwiaWF0IjoxNjMwNDczNjYxfQ.8JgWF4GQ_7klcn4PudsMBwYtwtjIW-f0IgFA1jBuVIk",
    // },
    ...getRequestConfig(),
});

//Action can thiệp trước khi gọi request API
httpService.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        console.log("error request interceptor: ", error);
        return Promise.reject(error);
    }
);
//Action can thiệp sau khi có request API trả về
httpService.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log("error response interceptor: ", error);
        return Promise.reject(error);
    }
);
