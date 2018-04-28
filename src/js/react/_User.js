import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import _UserHome from './_UserHome';
import _Empty from './_404';

const _User = ({ match }) => (
    <Switch>
        <Route path={`${match.path}`} component={_UserHome} exact />
        <Route component={_Empty} />
    </Switch>
);

_User.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _User;
