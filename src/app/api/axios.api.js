import axios from "axios";
import Cookies from 'js-cookie'
// const host = "http://18.237.239.203:8000";

const host = "http://progressivetennisparents.com";
const defaultConfig = (config) => {
    const token = document.cookie.split('=')[1];
    // return Object.assign({}, ...config, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // })
    return {
        ...config,
        headers: {
            Authorization: `Bearer ${token}`
        }

    }
}
console.log("------error----------");


const success = (data) => ({
    data: {...data},
    error: false
});

const failure = (error) => {
    console.log("------error----------", error.response.status);
    if (error.response.status === 401) {
        Cookies.remove('token');
        localStorage.clear();
        window.location.href = "./";  

    } 
    return {
        message: error.message,
            error: true,
                errorStatus: error.status
    }
};


// get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
const get = async (url, config = {}) => {
    console.log(url);
    try {
        const response = await axios.get(host + url, (defaultConfig(config)));
        return success(response);
    } catch(error) {
        return failure(error);
    }
}

// post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
const post = async (url, data, config = {}) => {
    
    try {
        const response = await axios.post(host+url,{...data},defaultConfig(config));
        return success(response);
    } catch(error) {
        console.log("---------error----------")
        return failure(error);
    }
}

//  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
const put = async (url, data, config) => {
    try {
        const response = await axios.put(host+url,{...data},defaultConfig(config));
        return success(response);
    } catch(error) {
        console.log("error==================")
        return failure(error);
    }
}
// delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
const deleteData = async (url, config) => {
    try {
        const response = await axios.delete(host+url,defaultConfig(config));
        return success(response);
    } catch(error) {
        return failure(error);
    }
}

export {
   get,
   post,
   put,
   deleteData 
}

