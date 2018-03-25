import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import * as path from '../path';
import Public from './Public';

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
                            <Link to={path._Home}>Dashboard</Link>
                        </li>
                    </ul>

                    <hr />

                    <Public />
                </Fragment>
            </Router>
        );
    }
}

export default Root;
