import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionPost from '../redux/action/actionPost';
import Basic from './section/Basic';
import Feed from './section/Feed';
import Loader from './unit/Loader';

class PostHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingPosts: true,
        };
    }
    componentDidMount() {
        const { actionPost } = this.props;
        actionPost.postsLoad().then(() =>
            this.setState({
                loadingPosts: false,
            }),
        );
    }
    render() {
        const { match, posts } = this.props;
        const { loadingPosts } = this.state;
        const item = 'post';
        const loopPost = posts.map((post, index) => {
            const count = posts.length - index;
            return (
                <article key={post.id} id={post.id} className={`${item} ${item}-${count} node-xs-20`}>
                    <header className="card card-panel">
                        <div className="card-body">
                            <h3 className="card-headline">{post.title}</h3>
                            <p>
                                {post.excerpt}... <Link to={`${match.path}/${post.slug}`}>Read More &rarr;</Link>
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
                                <article className="empty text-center">
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
    }
}

PostHome.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionPost: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ posts }) {
    return {
        posts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionPost: bindActionCreators(actionPost, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostHome);
