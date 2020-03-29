import axios from "axios";
import { json } from "body-parser";
import {GET_CHARTS} from "./types";


export const getCharts =  () => async dispatch => {

  try {
    const res = await axios.get("http://localhost:5000/api/chart/currentuser");

    dispatch({
      type: GET_CHARTS,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: POST_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
    console.log(err)
  }
};



export const getChartData = async ChartId => {


    try {
        const res = await axios.get(`http://localhost:5000/api/chart/${ChartId}`);
     
       


        return res.data;

      } catch (err) {
        // dispatch({
        //   type: POST_ERROR,
        //   payload: { msg: err.response.statusText, status: err.response.status }
        // });
        console.log(err);
      }

}





export const updateSubjects = async subjects => {

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify(subjects)

  try {
    console.log(subjects)
    
    const res = await axios.post('http://localhost:5000/api/chart/subjects',body,config)

    return res.data;

    


  } catch (err) {
    console.log(err);
  }

}

