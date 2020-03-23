import React, { Component, Fragment,useState,useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import {getChartData} from '../../actions/chart';
import Loading from '../layout/Loading';
import CustomizedLabel from './CustomizedLabel'
import CustomizedAxisTick from './CustomizedAxisTick'




const RenderLineChart = ({chart}) => {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  
const [chartData, setChartData] = useState({
  type: 'Line',
  data: ""

})

const loadData = async () =>{

  const res = await getChartData(chart._id);
  setChartData({...chartData, data:res});
  
}

useEffect(  () => {

  loadData()
  const interval = setInterval( async() => {
    loadData();
  }, 5000);
  return () => clearInterval(interval);
}, []);

const {data} = chartData;

if (!data) return <Loading/>

    return (
      <div className='post'>
      <h2>Title</h2>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      > 
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" label={<CustomizedLabel />} />
      </LineChart>
      </div>
    );
  }

  export default RenderLineChart
