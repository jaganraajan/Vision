import React, { PureComponent,useState,useEffect } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Legend,
} from 'recharts';
import {getChartData} from '../../actions/chart';
import Loading from '../layout/Loading';

const data = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];

const RenderPieChart = () => {


    const [chartData, setChartData] = useState({
        type: 'Pie',
        data: ""
      
      })
      
      const loadData = async () =>{
      
        const res = await getChartData(1);
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

  
    return (
      <div style={{ width: '100%', height: 300 }} className="post" >
        <h2>Title</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  


}

export default RenderPieChart