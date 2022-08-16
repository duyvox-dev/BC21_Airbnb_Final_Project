import axios from "axios";
import { localStorageService } from "./localService";
import { startLoading, stopLoading } from "../redux/loadingSlice";
import { store } from "../redux/store";
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

    ...getRequestConfig(),
});

//Action can thiệp trước khi gọi request API
httpService.interceptors.request.use(
    function (config) {
        store.dispatch(startLoading());

        const accessToken = getAccessToken();
        if (accessToken) config.headers.token = accessToken;
        else delete httpService.defaults.headers.common.token;
        return config;
    },
    function (error) {
        store.dispatch(stopLoading());

        return Promise.reject(error);
    }
);
//Action can thiệp sau khi có request API trả về
httpService.interceptors.response.use(
    function (response) {
        store.dispatch(stopLoading());

        // else delete httpService.defaults.headers.common.token;
        return response;
    },
    function (error) {
        store.dispatch(stopLoading());

        return Promise.reject(error);
    }
);
