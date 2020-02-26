import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signOut } from "../../actions/auth";

const Header = ({isAuthenticated,loading,signOut}) => {

  
  const authLinks = (
    <ul>


      <li>
        <Link onClick={signOut} to="/">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">sign-Out</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>

      <li>
        <Link to="/signup">Sign-Up</Link>
      </li>
      <li>
        <Link to="/signin">Sign-In</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> Vision
        </Link>
      </h1>
      {isAuthenticated? authLinks: guestLinks}
    </nav>
  );
};

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { signOut }
)(Header);
