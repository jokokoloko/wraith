import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '../access';
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

const AuthButton = withRouter(
    ({ login, logout }) =>
        fakeAuth.isAuthenticated ? (
            <p>
                Welcome!{' '}
                <button className="btn btn-secondary btn-lg btn-log-in" onClick={logout}>
                    Sign Out
                </button>
            </p>
        ) : (
            <p>
                You are not logged in.{' '}
                <button className="btn btn-primary btn-lg btn-log-in" onClick={login}>
                    Log In
                </button>
            </p>
        ),
);

class Root extends Component {
    state = {
        redirectToReferrer: false,
    };
    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };
    logout = () => {
        fakeAuth.signout(() => {
            this.setState({ redirectToReferrer: false });
        });
    };
    render() {
        const authenticated = fakeAuth.isAuthenticated;
        console.log(`authenticated: ${fakeAuth.isAuthenticated}`);
        return (
            <Router>
                <Fragment>
                    <Compass />
                    <Header />

                    <Switch>
                        <PrivateRoute path={path._Private} component={_Private} authenticated={authenticated} />
                        <PublicRoute path={path.Login} component={Login} authenticated={authenticated} />
                        <PublicRoute path={path.Register} component={Register} authenticated={authenticated} />
                        <Route path={path.About} component={About} />
                        <Route path={path.Root} component={Home} exact />
                        <Route component={Empty} />
                    </Switch>

                    <aside>
                        <div className="container text-center">
                            <AuthButton login={this.login} logout={this.logout} />
                        </div>
                    </aside>

                    <Footer />
                </Fragment>
            </Router>
        );
    }
}

export default Root;
