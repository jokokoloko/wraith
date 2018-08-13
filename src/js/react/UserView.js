import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionView from '../redux/action/actionView';
import * as actionPost from '../redux/action/actionPost';
import { VIEW_LOAD_REQUEST, POSTS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import * as client from '../client';
import * as logic from '../logic';
import * as path from '../path';
import Basic from './section/Basic';
import Contact from './widget/Contact';
import Avatar from './unit/Avatar';
import Loader from './unit/Loader';

class UserView extends Component {
    componentDidMount() {
        const { match, actionView, actionPost } = this.props;
        actionView.viewLoad(match.params.slug).then((user) => user.view && actionPost.postsLoadByUser(user.view.id));
    }
    render() {
        const { view: user, loadingView, loadingPosts, posts } = this.props;
        const userName = logic.userName(user);
        const item = 'post';
        const loopPost = posts.map((post, index) => {
            const count = posts.length - index;
            return (
                <article key={post.id} id={post.id} className={`${item} ${item}-${count} node-xs-20`}>
                    <header className="card card-panel">
                        <div className="card-body">
                            <h3 className="post-title card-headline">{post.title}</h3>
                            <p className="post-excerpt">
                                {post.excerpt}... <Link to={`${path.Post}/${post.slug}`}>Read More &rarr;</Link>
                            </p>
                        </div>
                    </header>
                </article>
            );
        });
        return loadingView ? (
            <Loader position="exact-center fixed" label="Loading view" />
        ) : (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-20 space-lg-80">
                        {user.id ? (
                            <div className="row gutter-20 gutter-lg-80">
                                <div className="col-lg-3">
                                    <header className="card card-panel">
                                        <div className="card-body">
                                            <Avatar
                                                position="fit exact-center"
                                                source={user.avatar || client.EMPTY_AVATAR}
                                                alternate={logic.userNameHandle(user, 'Avatar')}
                                            />
                                            {userName && <h1 className="user-name user-name-first user-name-last card-headline">{userName}</h1>}
                                            {user.handle && <h2 className="user-handle card-tagline">@{user.handle || 'handle'}</h2>}
                                            <Contact className="user-contact card-meta" item={user} />
                                            <div className="card-statistic">
                                                <p className="card-statistic-posts">Posts: {user.posts ? Object.keys(user.posts).length : 0}</p>
                                            </div>
                                        </div>
                                    </header>
                                </div>

                                <div className="col">
                                    {loadingPosts ? (
                                        <Loader position="exact-center fixed" label="Loading posts" />
                                    ) : posts.length > 0 ? (
                                        loopPost
                                    ) : (
                                        <article className="empty">
                                            <header>
                                                <h3>{`No ${item}s`}</h3>
                                            </header>
                                        </article>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <header className="empty text-center">
                                <h1>404 - User</h1>
                            </header>
                        )}
                    </Basic>
                </div>
            </main>
        );
    }
}

UserView.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    loadingView: PropTypes.bool.isRequired,
    loadingPosts: PropTypes.bool.isRequired,
    view: PropTypes.objectOf(PropTypes.any).isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
    actionPost: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ view, calls, posts }) {
    return {
        loadingView: findByString(calls, removeStatus(VIEW_LOAD_REQUEST)),
        loadingPosts: findByString(calls, removeStatus(POSTS_LOAD_REQUEST)),
        view,
        posts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionView: bindActionCreators(actionView, dispatch),
        actionPost: bindActionCreators(actionPost, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserView);
