import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../actions/auth";
import PropTypes from "prop-types";

// { setAlert, register, isAuthenticated }

const SignUp = ({signUp,isAuthenticated}) => {

  const [formData,setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2:"",
    subjects:[]
  })

  const {name,email,password,password2,subjects} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault();
    
    if(password !== password2){
      console.log('passwords not equal')
    }

    else {
      signUp({name,email,password,subjects})
    }
  }
    
  

  if(isAuthenticated) return <Redirect to ='/dashboard'/>

  return (
    <Fragment>
      <div className='signup__form'>
        <h1 className="large">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit ={e => onSubmit(e)}>
          <div className="form-group">
          <label for="name">Username</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange = {e => onChange(e)}
              
              
            />
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange = {e => onChange(e)}
              
              
            />
          </div>
          <div className="form-group">
            
          <label for="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange = {e => onChange(e)}
              
              
            />
          </div>
          <div className="form-group">
          <label for="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange = {e => onChange(e)}
              
              
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Sign Up" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>

    </Fragment>
  );
};

SignUp.propTypes = {

  isAuthenticated: PropTypes.bool,
  signUp: PropTypes.func.isRequired


}
const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})



export default connect(mapStateToProps,{signUp})(SignUp)
