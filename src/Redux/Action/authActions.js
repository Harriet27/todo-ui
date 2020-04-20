import { 
    API_AUTH_START, 
    API_AUTH_SUCCESS, 
    API_AUTH_FAILED, 
    LOGIN, 
    LOGOUT, 
    VERIFIED } from '../types';
import Axios from 'axios';
import { API_URL } from '../../Support/API_URL';

export const Login = (form) => {
    return async (dispatch) => {
        dispatch({
            type : API_AUTH_START
        })
        try {
            let res = await Axios.post(`${API_URL}/users/login`, form);
            let { id, username, email, roleId, token, verified } = res.data.data;
            dispatch({
                type : LOGIN,
                payload : {
                    id, 
                    username, 
                    email, 
                    roleId, 
                    verified
                }
            })
            localStorage.setItem('token', token)
            dispatch({
                type : API_AUTH_SUCCESS
            })
        } catch (err) {
            dispatch({
                type : API_AUTH_FAILED,
                payload : err
            })
        }
    }
}

export const Register = (form) => {
    return (dispatch) => {
        dispatch({
            type : API_AUTH_START
        })
        Axios.post(`${API_URL}/users/register`, form)
        .then((res) => {
            let { id, username, email, roleId, token, verified } = res.data.data;
            console.log(res);
            dispatch({
                type : LOGIN,
                payload : { 
                    id, 
                    username, 
                    email, 
                    roleId, 
                    verified
                }
            })
            localStorage.setItem('token', token);
            dispatch({
                type : API_AUTH_SUCCESS
            })
        })
        .catch((err) => {
            dispatch({
                type : API_AUTH_FAILED
            })
        })
    }
}

export const keepLogin = (token) => {
    console.log('keepLogin');
    return async (dispatch) => {
        let token = localStorage.getItem('token');
        console.log(token);
        try {
            if (token) {
                dispatch({
                    type : API_AUTH_START
                })
                let headers = {
                    headers : {
                        'Authorization' : ` Bearer ${token}`
                    }
                }
                let res = await Axios.post(`${API_URL}/users/keep-login`, {}, headers);
                let { id, username, email, roleId } = res.data.data;
                dispatch({
                    type : LOGIN,
                    payload : {
                        id,
                        username,
                        email,
                        roleId
                    }
                })
                dispatch({
                    type : API_AUTH_SUCCESS
                })
            }
        } catch (err) {
            dispatch({
                type : API_AUTH_FAILED,
                payload : {
                    status : err.message,
                    message : err.message
                }
            })
        }
    }
}

export const Logout = () => {
    return(dispatch) => {
        localStorage.removeItem('token');
        dispatch({
            type : LOGOUT
        })
    }
}
export const Verification = (form) => {
    return async (dispatch) => {
        dispatch({
            type : API_AUTH_START
        })
        try {
            let res = await Axios.post(`${API_URL}/users/verification`, form);
            dispatch({
                type : VERIFIED,
                payload : res.data.data
            })
            dispatch({
                type : API_AUTH_SUCCESS
            })
        } catch (err) {
            dispatch({
                type : API_AUTH_FAILED
            })
        }
    }
}