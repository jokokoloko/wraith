import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../path';
import { SmartRoute } from '../access';
import CompositionView from './CompositionView';
import CompositionHome from './CompositionHome';
import Empty from './404';

const Composition = ({ match, authenticated }) => (
    <Switch>
        <SmartRoute path={`${match.path}${path.CompositionView}`} component={CompositionView} authenticated={authenticated} />
        <SmartRoute path={`${match.path}`} component={CompositionHome} authenticated={authenticated} exact />
        <Route component={Empty} />
    </Switch>
);

Composition.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    authenticated: PropTypes.bool.isRequired,
};

export default Composition;
