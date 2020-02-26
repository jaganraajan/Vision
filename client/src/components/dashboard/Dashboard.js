import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Chart from '../charts/Chart';

import  { getChartData , getCharts} from '../../actions/chart'
import Spinner from "../layout/Loading"

const Dashboard = ({auth: {user},charts: {charts,loading}, getCharts}) => {

  useEffect(() => {
    getCharts();
  }, [getCharts]);


  return loading || charts === null? (<Spinner/>) : (
    
    <Fragment >
      <div className='flex-container'>
        {charts.map(chart => (<Chart key={chart._id} chart={chart} />))}
      </div>
    </Fragment>
  );
};


{/* <div className='flex-item'><Bar/></div>
<div className='flex-item'><RenderBarChart/></div>
<div className='flex-item'><RenderLineChart/></div>
<div className='flex-item'><RenderPieChart/></div> */}

const mapStateToProps = state => ({
  auth : state.auth,
  charts : state.charts
})

Dashboard.propTypes = {
  getCharts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  charts: PropTypes.object.isRequired,
}

export default connect(mapStateToProps,{getCharts})(Dashboard)
