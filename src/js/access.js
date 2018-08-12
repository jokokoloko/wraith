import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as path from './path';

export const PrivateArea = ({ component: Component, authenticated, ...rest }) => (
    <Route {...rest} render={(props) => authenticated === true && <Component {...props} authenticated={authenticated} />} />
);

export const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            authenticated === true ? (
                <Component {...props} authenticated={authenticated} />
            ) : (
                <Redirect
                    to={{
                        pathname: path.Login,
                        state: {
                            from: props.location,
                        },
                    }}
                />
            )
        }
    />
);

export const PublicRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (authenticated === false ? <Component {...props} authenticated={authenticated} /> : <Redirect to={path._Access} />)}
    />
);

export const SmartRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route {...rest} render={(props) => <Component {...props} authenticated={authenticated} />} />
);

PrivateArea.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

PrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    location: PropTypes.objectOf(PropTypes.any),
};

PublicRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

SmartRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

PrivateRoute.defaultProps = {
    location: undefined,
};
