import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { updateSubjects } from "../../actions/chart";
const DashboardActions = () => {


  const [inputData,setInputData] = useState({
    subjects: "",
  })

  const {subjects} = inputData;

  const onChange = e => setInputData({...inputData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault();
    
    if(subjects === ""){
      console.log('no subjects entered')
    }

    else {
      updateSubjects({subjects})
    }
  }
  
  return (
    
      <form class="search" onSubmit={e => onSubmit(e)}>      
        <input
         type="search"
         value={subjects}
         id="site-search"
         name="subjects"
         aria-label="Search through site content"
         placeholder="#Subject1,Subject2..."
         onChange = {e => onChange(e)}/>
        <input type="submit" className="btn btn-primary" value="Apply" />
      </form>


    
  );
};

export default DashboardActions;
