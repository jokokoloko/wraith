import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionPost from '../redux/action/actionPost';
import * as path from '../path';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class _PostHome extends Component {
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
        const empty = '-';
        const labelPost = ['#', 'Title', 'Author', 'Action'];
        const loopPost = posts.map((post, index) => {
            const count = posts.length - index;
            return (
                <tr key={post.id} id={post.id} className={`${item} ${item}-${count}`}>
                    <th scope="row">{count}</th>
                    <td>{post.title || empty}</td>
                    <td>{post.user || empty}</td>
                    <td>
                        <Link to={`${match.path}/${post.id}`}>Edit</Link> - <Link to={`${path.Post}/${post.slug}`}>View</Link>
                    </td>
                </tr>
            );
        });
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <header className="d-flex node-xs-50">
                            <h1>Posts</h1>
                            <Link className="btn btn-default to-add" to={`${match.path}${path._PostAdd}`}>
                                Add New
                            </Link>
                        </header>

                        <section className="node-xs-50">
                            {loadingPosts ? (
                                <Loader position="exact-center fixed" label="Loading posts" />
                            ) : (
                                <div className="table-container table-responsive-sm">
                                    <table className={`table table-striped table-bordered table-style table-size-80 table-${item}`}>
                                        <thead>
                                            <tr>
                                                {labelPost.map((name, index) => {
                                                    const count = index + 1;
                                                    return (
                                                        <th key={`label-${count}`} className={`label label-${count}`} scope="col">
                                                            {name}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {posts.length > 0 ? (
                                                loopPost
                                            ) : (
                                                <tr className={`${item} ${item}-empty`}>
                                                    <th scope="row">0</th>
                                                    <td>{`No ${item}s`}</td>
                                                    <td>{empty}</td>
                                                    <td>{empty}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </Basic>
                </div>
            </main>
        );
    }
}

_PostHome.propTypes = {
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
)(_PostHome);
