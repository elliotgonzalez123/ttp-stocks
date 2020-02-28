import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

//custom routing component setup to hide protected routes from unauthorized users... bounces user back to login if not logged in

const PrivateRoue = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoue.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoue);
