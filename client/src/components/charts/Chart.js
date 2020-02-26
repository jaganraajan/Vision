import React from 'react'
import RenderLineChart from '../charts/RenderLineChart';
import RenderBarChart from '../charts/RenderBarChart';
import RenderPieChart from '../charts/RenderPieChart';

const Chart =({chart}) => {


  switch(chart.chartType){
    case "Bar":
      return (<RenderBarChart  chart={chart}/>)
    case "Line":
      return (<RenderLineChart  chart={chart}/>)
      default: return <h1>Undefined</h1>


  }

}

export default Chart
