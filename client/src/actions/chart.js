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



export const getChartData = async ({ChartId}) => {


    try {
        // const res = await axios.get(`/api/charts/${ChartId}`);
        // const restTest = {
        //     "chart": {
        //       "caption": "Countries With Most Oil Reserves [2017-18]",
        //       "subCaption": "In MMbbl = One Million barrels",
        //       "xAxisName": "Country",
        //       "yAxisName": "Reserves (MMbbl)",
        //       "numberSuffix": "K",
        //       "theme": "fusion",
        //       "updateAnimDuration": "0.4"
        //     },
        //     "data": [
        //       {
        //         "label": "Venezuela",
        //         "value": "290"
        //       },
        //       {
        //         "label": "Saudi",
        //         "value": "260"
        //       },
        //       {
        //         "label": "Canada",
        //         "value": "180"
        //       },
        //       {
        //         "label": "Iran",
        //         "value": "140"
        //       },
        //       {
        //         "label": "Russia",
        //         "value": "115"
        //       },
        //       {
        //         "label": "UAE",
        //         "value": "100"
        //       },
        //       {
        //         "label": "US",
        //         "value": "30"
        //       },
        //       {
        //         "label": "China",
        //         "value": "30"
        //       }
        //     ]
        //   }
          
        // const jsonTest1 = JSON.stringify(restTest);
        // const jsonTest = JSON.parse(jsonTest1);
        // jsonTest.data[2].value= 20;
        // const jsonTest3 = JSON.stringify(jsonTest);
        // console.log(jsonTest.data[2])
       
        const data = [
          {
            name: 'Page A', value: 1000
          },
          {
            name: 'Page B', value: 3000
          },
          {
            name: 'Page C', value: 2000
          },
          {
            name: 'Page D', value: 2780
          },
          {
            name: 'Page E', value: 1890
          },
          {
            name: 'Page F', value: 2390
          },
          {
            name: 'Page G', value: 3490
          },
        ];

        return data;

      } catch (err) {
        // dispatch({
        //   type: POST_ERROR,
        //   payload: { msg: err.response.statusText, status: err.response.status }
        // });
        console.log(err);
      }

}

