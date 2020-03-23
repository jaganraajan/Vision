import React, { PureComponent,useState,useEffect } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Legend, Cell, Tooltip, Label
} from 'recharts';
import {getChartData} from '../../actions/chart';
import Loading from '../layout/Loading';

const COLORS = ['#ed1818','#f26c0c' , '#35ed07','#2aebf5','#076bed'];

const RenderPieChart = ({chart}) => {


    const [chartData, setChartData] = useState({
        type: 'Pie',
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
      <div style={{ width: '100%', height: 400 }} className="post" >
        <h2>Title</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8" label >
              {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
              
            </Pie>
            <Tooltip/>
            <Label/>
            <Legend/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  


}

export default RenderPieChart