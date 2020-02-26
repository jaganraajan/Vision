import React, { Component, Fragment,useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import {getChartData} from '../../actions/chart';
import Loading from '../layout/Loading';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);



const Bar   = () => {



const [chartData, setChartData] = useState({
      type: 'column2d',
      width: 400,
      height: 400,
      dataFormat: 'json',
      dataSource: ""

})

const loadData = async () =>{

  const res = await getChartData(1);
  setChartData({...chartData, dataSource:res});
  
}

useEffect(  () => {

  // loadData()
  const interval = setInterval( async() => {
    loadData();
  }, 5000);
  return () => clearInterval(interval);
}, []);


    if (chartData.dataSource.length==0) return <Loading/>
      


    return (

      
      <div >   
        <ReactFC {...chartData} />
         

        
      </div>
    );
  }


// }

export default Bar;
