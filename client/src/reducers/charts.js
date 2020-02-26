import {
    GET_CHARTS, CLEAR_CHARTS
  } from "../actions/types";



  const initialState = {

    loading: true,
    charts: null
  };


  export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){

        case GET_CHARTS:
            return {
                ...state,
                loading: false,
                charts: payload
            }
        case CLEAR_CHARTS:
            return {
                ...state,
                charts: null,
                loading: false
            }
        
        default: return state;
    }



  }