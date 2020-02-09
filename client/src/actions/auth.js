import axios from "axios";
import {
    SIGN_UP,
    SIGN_UP_REFUSED,
    LOAD_USER,
    SIGN_IN,
    SIGN_IN_REFUSED,
    SIGN_OUT
  } from "./types";

  import setAuthToken from '../utils/setAuthToken';


export const loadUser = () => async dispatch => {

  if(localStorage.token){
    setAuthToken(localStorage.token);
  }

  try {

    const res = await axios.get('http://localhost:5000/api/auth/current');
   
    if(res.data.name)
     {
       dispatch({
         type: LOAD_USER,
         payload: res.data
       })
     }
     else( console.log('error'))
  } catch (err) {
    console.log(err);
    
  }

}

  export const signUp = ({name,email,password}) => async dispatch => {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }

    };

    const body = JSON.stringify({name,email,password})

    try {

      const res = await axios.post('http://localhost:5000/api/auth/signup',body,config);

      dispatch({
        type: SIGN_UP,
        payload: res.data
      })

      dispatch(loadUser());


    } catch (err) {
      console.log(err);
      window.alert(err);
      
      dispatch({
        type: SIGN_UP_REFUSED
      })
    }

  }

  export const signIn = ({email,password}) => async dispatch => {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const body = JSON.stringify({email,password})

    try {
      
      const res = await axios.post('http://localhost:5000/api/auth/signin',body,config)

       await dispatch({
        type: SIGN_IN,
        payload: res.data
      })

      dispatch(loadUser());


    } catch (err) {
      dispatch({
        type:SIGN_IN_REFUSED
      })
    }

  }

  export const signOut = () => dispatch => {    
    dispatch({ type: SIGN_OUT });
  };
  