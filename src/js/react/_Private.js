import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../path';
import _Home from './_Home';
import _Empty from './_404';
import Toolbar from './region/Toolbar';

const _Private = ({ match }) => (
    <Fragment>
        <Toolbar match={match} />

        <Switch>
            <Route path={`${match.path}${path._Post}`} component={_Home} />
            <Route path={`${match.path}`} component={_Home} exact />
            <Route component={_Empty} />
        </Switch>
    </Fragment>
);

_Private.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _Private;
