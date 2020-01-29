import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../path';
import { PrivateRoute } from '../access';
import _CompositionEdit from '../composition-edit/_CompositionEdit';
import _Empty from './_404';

const _Composition = ({ match, authenticated }) => (
    <Switch>
        <PrivateRoute path={`${match.path}${path._CompositionEdit}`} component={_CompositionEdit} authenticated={authenticated} />
        <Redirect to={path.Root} exact />
        <Route component={_Empty} />
    </Switch>
);

_Composition.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    authenticated: PropTypes.bool.isRequired,
};

export default _Composition;
