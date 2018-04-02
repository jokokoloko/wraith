import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import * as path from '../path';
import _Private from './_Private';
import Login from './Login';
import Register from './Register';
import About from './About';
import Home from './Home';
import Empty from './404';
import Compass from './region/Compass';
import Header from './region/Header';
import Footer from './region/Footer';

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100); // fake async
    },
};

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

const PublicRoute = ({ component: Page, ...rest }) => <Route {...rest} render={(props) => (fakeAuth.isAuthenticated === false ? <Page {...props} /> : <Redirect to={path._Private} />)} />;

class Root extends Component {
    render() {
        console.log(`authenticated: ${fakeAuth.isAuthenticated}`);
        return (
            <Router>
                <Fragment>
                    <Compass />
                    <Header />

                    <Switch>
                        <PrivateRoute path={path._Private} component={_Private} />
                        <PublicRoute path={path.Login} component={Login} />
                        <PublicRoute path={path.Register} component={Register} />
                        <Route path={path.About} component={About} />
                        <Route path={path.Root} component={Home} exact />
                        <Route component={Empty} />
                    </Switch>

                    <Footer />
                </Fragment>
            </Router>
        );
    }
}

export default Root;
