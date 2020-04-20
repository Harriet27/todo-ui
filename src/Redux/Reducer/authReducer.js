import {
    API_AUTH_START,
    API_AUTH_SUCCESS,
    API_AUTH_FAILED,
    LOGIN,
    LOGOUT,
    VERIFIED
} from '../types';

const INITIAL_STATE = {
    id : 0,
    username : '',
    status : '',
    message : '',
    loading : false,
    verified : false
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case API_AUTH_START : 
            return {
                loading : true
            }
        case API_AUTH_SUCCESS : 
            return {
                ...state,
                loading : false
            }
        case API_AUTH_FAILED : 
            return {
                ...state,
                loading : false
            }
        case LOGIN : 
            return {
                ...state,
                ...action.payload,
                logged : true
            }
        case LOGOUT :
            return INITIAL_STATE
        case VERIFIED :
            return {
                ...state,
                verified : action.payload
            }
        default : 
            return state
    }
}