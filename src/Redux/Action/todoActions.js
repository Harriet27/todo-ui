import {
    API_TODO_START,
    FETCH_DATA,
    API_TODO_SUCCESS,
    API_TODO_FAILED
} from '../types';
import Axios from 'axios';
import { API_URL } from '../../Support/API_URL';

const token = localStorage.getItem('token');

export const fetchData = (userId) => {
    return async (dispatch) => {
        dispatch({
            type : API_TODO_START
        })
        try {
            let headers = {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            }
            let res = await Axios.get(`${API_URL}/todo/get-todo/${userId}`, headers);
            dispatch({
                type : FETCH_DATA,
                payload : res.data.dataList
            })
            console.log(res.data)
            dispatch({
                type : API_TODO_SUCCESS
            })
        } catch (err) {
            dispatch({
                type : API_TODO_FAILED
            })
        }
    }
}

export const addData = (userId, formData) => {
    return async (dispatch) => {
        dispatch({
            type : API_TODO_START
        })
        try {
            let headers = {
                headers : {
                    'Authorization' : `Bearer ${token}`,
                    'Content-type' : 'multipart/form-data'
                }
            }
            await Axios.post(`${API_URL}/todo/add-todo/${userId}`, formData, headers);
            dispatch({
                type : API_TODO_SUCCESS
            })
        } catch (err) {
            dispatch({
                type : API_TODO_FAILED
            })
        }
    }
}

export const editData= (id, todo) => {
    return async (dispatch) => {
        dispatch({
            type : API_TODO_START
        })
        try {
            let headers = {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            }
            await Axios.post(`${API_URL}/todo/edit-todo/${id}`, {todo}, headers)
            dispatch({
                type : API_TODO_SUCCESS
            })
        } catch (err) {
            dispatch({
                type : API_TODO_FAILED
            })
        }
    }
}
export const deleteData= (id) => {
    return async (dispatch) => {
        dispatch({
            type : API_TODO_START
        })
        try {
            let headers = {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            }
            await Axios.delete(`${API_URL}/todo/delete-todo/${id}`, headers)
            dispatch({
                type : API_TODO_SUCCESS
            })
        } catch (err) {
            dispatch({
                type : API_TODO_FAILED
            })
        }
    }
}