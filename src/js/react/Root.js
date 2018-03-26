import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import * as path from '../path';
import _Home from './_Home';
import Login from './Login';
import Register from './Register';
import About from './About';
import Home from './Home';
import Empty from './404';
import fakeAuth from '../../api/fakeAuth';

const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <p>
                Welcome!{' '}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push(path.Home));
                        console.log(fakeAuth.isAuthenticated);
                    }}>
                    Sign out
                </button>
            </p>
        ) : (
            <p>You are not logged in.</p>
        ),
);

const PrivateRoute = ({ component: Page, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            fakeAuth.isAuthenticated === true ? (
                <Page {...props} />
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

const PublicRoute = ({ component: Page, ...rest }) => <Route {...rest} render={(props) => (fakeAuth.isAuthenticated === false ? <Page {...props} /> : <Redirect to={path._Home} />)} />;

class Root extends Component {
    render() {
        console.log(fakeAuth.isAuthenticated);
        return (
            <Router>
                <Fragment>
                    <AuthButton />
                    <ul>
                        <li>
                            <Link to={path.Home}>Home</Link>
                        </li>
                        <li>
                            <Link to={path.About}>About</Link>
                        </li>
                        <li>
                            <Link to={path.Register}>Register</Link>
                        </li>
                        <li>
                            <Link to={path.Login}>Login</Link>
                        </li>
                        <li>
                            <Link to={path._Home}>Dashboard</Link>
                        </li>
                    </ul>

                    <hr />

                    <Switch>
                        <PrivateRoute path={path._Home} component={_Home} />
                        <PublicRoute path={path.Login} component={Login} />
                        <PublicRoute path={path.Register} component={Register} />
                        <Route path={path.About} component={About} />
                        <Route path={path.Home} component={Home} exact />
                        <Route component={Empty} />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default Root;
