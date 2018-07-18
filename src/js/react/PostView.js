import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionView from '../redux/action/actionView';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class PostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingView: true,
        };
    }
    componentDidMount() {
        const { match, actionView } = this.props;
        actionView.viewLoad(match.params.slug).then(() =>
            this.setState({
                loadingView: false,
            }),
        );
    }
    render() {
        const { view: post } = this.props;
        const { loadingView } = this.state;
        return loadingView ? (
            <Loader position="exact-center fixed" label="Loading view" />
        ) : (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-20 space-lg-80">
                        {post.id ? (
                            <Fragment>
                                <header className="node-xs-50 node-lg-80">
                                    <h1>{post.title}</h1>
                                </header>

                                <section className="node-xs-50 node-lg-80">
                                    <p>{post.content}</p>
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
    view: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ view }) {
    return {
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
