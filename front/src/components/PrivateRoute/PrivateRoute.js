import React from 'react'
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
    const { component: Component, layout: Layout, isLogged, ...rest} = props;
    return (
        <Route 
            {...rest}
            render={matchProps => (
                isLogged ? (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                ) : (
                    <Redirect to="/login" />
                )
              )}
        />
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string,
    isLogged: PropTypes.bool
};
  

export default PrivateRoute