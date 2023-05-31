import axios from "axios";

export const signUp = body =>{
    return axios.post('/api/users/create',body);
};

export const signIn = body =>{
    return axios.post('/api/users/login')
}

export const changeLanguage = language =>{
    axios.defaults.headers['accept-language']=language;
}