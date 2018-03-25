import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import * as path from '../path';
import Login from './Login';
import Register from './Register';
import About from './About';
import Home from './Home';
import Empty from './404';

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

class Root extends Component {
    render() {
        return (
            <Router>
                <Fragment>
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
                        <Route path={path.Login} component={Login} />
                        <Route path={path.Register} component={Register} />
                        <Route path={path.About} component={About} />
                        <Route path={path.Home} exact component={Home} />
                        <Route component={Empty} />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default Root;
