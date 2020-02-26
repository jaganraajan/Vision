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
          <h1 className="x-large">We give business insights</h1>
          <p className="lead">
            Create a business analytics dashboard
          </p>
          <div className="buttons">
            <Link to="/signup" className="btn btn-primary">
              Sign-Up
            </Link>
            <Link to="/signin" className="btn btn-light">
              Sign-In
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
