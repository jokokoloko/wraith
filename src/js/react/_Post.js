import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../path';
import _PostEdit from './_PostEdit';
import _PostHome from './_PostHome';
import _Empty from './_404';

const _Post = ({ match }) => (
    <Switch>
        <Route path={`${match.path}${path._PostAdd}`} component={_PostEdit} />
        <Route path={`${match.path}${path._PostEdit}`} component={_PostEdit} />
        <Route path={`${match.path}`} component={_PostHome} exact />
        <Route component={_Empty} />
    </Switch>
);

_Post.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _Post;
