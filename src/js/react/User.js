import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../path';
import UserView from './UserView';
import Empty from './404';

const User = ({ match }) => (
    <Switch>
        <Route path={`${match.path}${path.UserView}`} component={UserView} />
        <Route component={Empty} />
    </Switch>
);

User.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default User;
