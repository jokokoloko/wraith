import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../path';
import UserView from './UserView';
import UserHome from './UserHome';
import Empty from './404';

const User = ({ match }) => (
    <Switch>
        <Route path={`${match.path}${path.UserView}`} component={UserView} />
        <Route path={`${match.path}`} component={UserHome} exact />
        <Route component={Empty} />
    </Switch>
);

User.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default User;
