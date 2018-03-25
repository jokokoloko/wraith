import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as path from '../path';
import Empty from './404';
import Home from './Home';
import About from './About';
import Register from './Register';
import Login from './Login';

const Public = () => (
    <Switch>
        <Route path={path.Login} component={Login} />
        <Route path={path.Register} component={Register} />
        <Route path={path.About} component={About} />
        <Route path={path.Home} exact component={Home} />
        <Route component={Empty} />
    </Switch>
);

export default Public;
