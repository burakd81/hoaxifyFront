import axios from "axios";

export const signUp = body =>{
    return axios.post('/api/users/create',body);
};

export const login = creds =>{
    return axios.post('/api/users/login',{},{auth: creds});
};



export const changeLanguage = language =>{
    axios.defaults.headers['accept-language']=language;
}