import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

const Landing = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <img src="logo3.png" alt="logo2"/>
          <h1 className="x-large">Providing marketing insights for your business</h1>
          <p className="lead">
            Create a business analytics dashboard
          </p>
          <div className="buttons">
            <Link to="/signup" className="btn btn-primary">
              Register
            </Link>
            <Link to="/signin" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
