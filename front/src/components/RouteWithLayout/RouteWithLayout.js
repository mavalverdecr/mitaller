import React from 'react'
import PropTypes from 'prop-types';
import PrivateRoute from '../PrivateRoute'
import PublicRoute from '../PublicRoute'

const RouteWithLayout = (props) => {
    const { private: isPrivate, ...rest } = props;

    return (
        isPrivate ? (
            <PrivateRoute {...rest} />
        ) : (
            <PublicRoute {...rest} />
        ) 
    )
}

RouteWithLayout.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string,
    private: PropTypes.bool,
    isLogged: PropTypes.bool
};

export default RouteWithLayout