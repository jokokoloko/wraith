import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { POSTS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import * as path from '../path';
import Basic from './section/Basic';
import Feed from './section/Feed';
import Loader from './unit/Loader';

const PostHome = ({ loadingPosts, posts }) => {
    const item = 'post';
    const loopPost = posts.map((post, index) => {
        const count = posts.length - index;
        return (
            <article key={post.id} id={post.id} className={`${item} ${item}-${count} node-xs-20`}>
                <header className="card card-panel">
                    <div className="card-body">
                        <h3 className="card-headline">{post.title}</h3>
                        <p>
                            {post.excerpt}... <Link to={`${path.Post}/${post.slug}`}>Read More &rarr;</Link>
                        </p>
                    </div>
                </header>
            </article>
        );
    });
    return (
        <main id="main" role="main">
            <div className="container-fluid">
                <Basic space="space-xs-30 space-lg-80">
                    <header className="text-center">
                        <h1>Posts</h1>
                    </header>
                </Basic>

                <Feed space="space-xs-20 space-lg-80" item={item}>
                    <section>
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
                    </section>
                </Feed>
            </div>
        </main>
    );
};

PostHome.propTypes = {
    loadingPosts: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps({ calls, posts }) {
    return {
        loadingPosts: findByString(calls, removeStatus(POSTS_LOAD_REQUEST)),
        posts,
    };
}

export default connect(mapStateToProps)(PostHome);
