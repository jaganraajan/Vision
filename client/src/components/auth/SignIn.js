import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signIn } from "../../actions/auth";

// { login, isAuthenticated }
const SignIn = ({signIn,isAuthenticated}) => {

const [signInData,setSignInData] = useState({
  email:"",
  password:""

})

const {email,password} = signInData;

const handleChange = e => {
  setSignInData({...signInData, [e.target.name]:e.target.value})
}

const handleSubmit = form => {
  form.preventDefault();
  signIn({email,password});
}

if(isAuthenticated) return (<Redirect to='/dashboard'/>)

  return (
    <Fragment>
      <div className='signup__form'>
        <h1 className="large">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Sign Into Your Account
        </p>
        <form className="form" onSubmit={form => handleSubmit(form)} >
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => handleChange(e)}
              
              
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="3"
              autoComplete="current-password"
              value={password}
              onChange={e => handleChange(e)}
              
              
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Sign In" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </Fragment>
  );
};

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  
})

export default connect(mapStateToProps,{signIn})(SignIn)