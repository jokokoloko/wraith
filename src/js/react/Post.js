import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../path';
import PostView from './PostView';
import PostHome from './PostHome';
import Empty from './404';

const Post = ({ match }) => (
    <Switch>
        <Route path={`${match.path}${path.PostView}`} component={PostView} />
        <Route path={`${match.path}`} component={PostHome} exact />
        <Route component={Empty} />
    </Switch>
);

Post.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Post;
