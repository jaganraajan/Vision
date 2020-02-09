import {
    SIGN_UP,
    SIGN_UP_REFUSED,
    LOAD_USER,
    AUTH_ERROR,
    SIGN_IN,
    SIGN_IN_REFUSED,
    SIGN_OUT,
    ACCOUNT_DELETED
  } from "../actions/types";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null
  };
  export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){

        case LOAD_USER:        
        return {
            ...state,
            isAuthenticated: true,
            loading:false,
            user: payload
            
        };



        case SIGN_UP:
        case SIGN_IN:
        localStorage.setItem("token", payload.token)
        return {
            ...state,
            ...payload,
            loading: false
            
        };
        case SIGN_UP_REFUSED:
        case SIGN_IN_REFUSED:
        case SIGN_OUT:

        localStorage.removeItem("token");
        return{
            ...state,
            token: false,
            isAuthenticated: false,
            loading:false,
            user:null
        }

        default:
            return state;
    }

  }
  