import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionView from '../redux/action/actionView';
import { VIEW_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class PostView extends Component {
    componentDidMount() {
        const { match, actionView } = this.props;
        actionView.viewLoad(match.params.slug);
    }
    render() {
        const { view: post, loadingView } = this.props;
        return loadingView ? (
            <Loader position="exact-center fixed" label="Loading view" />
        ) : (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-20 space-lg-80">
                        {post.id ? (
                            <Fragment>
                                <header className="node-xs-50 node-lg-80">
                                    <h1 className="post-title">{post.title}</h1>
                                </header>

                                <section className="node-xs-50 node-lg-80">
                                    <p className="post-content">{post.content}</p>
                                </section>
                            </Fragment>
                        ) : (
                            <header className="empty text-center">
                                <h1>404 - Post</h1>
                            </header>
                        )}
                    </Basic>
                </div>
            </main>
        );
    }
}

PostView.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    loadingView: PropTypes.bool.isRequired,
    view: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ view, calls }) {
    return {
        loadingView: findByString(calls, removeStatus(VIEW_LOAD_REQUEST)),
        view,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionView: bindActionCreators(actionView, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostView);
