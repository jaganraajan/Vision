import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Loading =() => (
  <div className='post'>
    
    <h3 >Grabbing the data...</h3>
    <img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="Loading..."
    />

  </div>
);

export default Loading
