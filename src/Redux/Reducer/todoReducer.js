import {
    API_TODO_START,
    API_TODO_SUCCESS,
    API_TODO_FAILED,
    FETCH_DATA,
} from '../types';

const INITIAL_STATE = {
    dataList : [],
    loading : false
}

export const todoReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case API_TODO_START : 
            return{
                ...state,
                loading : true
            }
        case API_TODO_SUCCESS : 
            return{
                ...state,
                loading : false
            }
        case API_TODO_FAILED : 
            return{
                ...state,
                loading : false
            }
        case FETCH_DATA : 
            return{
                ...state,
                dataList : action.payload
            }
        default : 
            return state
    }
}