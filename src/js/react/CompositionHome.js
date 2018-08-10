import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionComposition from '../redux/action/actionComposition';
import * as path from '../path';
import Basic from './section/Basic';
import Feed from './section/Feed';
import Loader from './unit/Loader';

class CompositionHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingCompositions: true,
        };
    }
    componentDidMount() {
        const { actionComposition } = this.props;
        actionComposition.compositionsLoad().then(() =>
            this.setState({
                loadingCompositions: false,
            }),
        );
    }
    render() {
        const { authenticated, profile, compositions } = this.props;
        const { loadingCompositions } = this.state;
        const item = 'composition';
        const loopComposition = compositions.map((composition, index) => {
            const count = compositions.length - index;
            return (
                <article key={composition.id} id={composition.id} className={`${item} ${item}-${count} node-xs-20`}>
                    <header className="card card-panel">
                        <div className="card-body">
                            <p className="composition-lane">{`${composition.lane.top}, ${composition.lane.jungle}, ${composition.lane.middle}, ${
                                composition.lane.bottom
                            }, ${composition.lane.support}`}</p>
                            {composition.meta.title && <h3 className="composition-title card-headline">{composition.meta.title}</h3>}
                            {composition.meta.excerpt && <p className="composition-excerpt">{composition.meta.excerpt}...</p>}
                            <p className="composition-user">by {composition.user}</p>
                            <p className="composition-action">
                                <Link to={`/${composition.id}`}>View</Link>
                                {authenticated &&
                                    profile.id === composition.user && (
                                        <Fragment>
                                            <span className="separator"> - </span>
                                            <Link to={`${path._Edit}/${composition.id}`}>Edit</Link>
                                        </Fragment>
                                    )}
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
                            <h1>Compositions</h1>
                        </header>
                    </Basic>

                    <Feed space="space-xs-20 space-lg-80" item={item}>
                        <section>
                            {loadingCompositions ? (
                                <Loader position="exact-center fixed" label="Loading compositions" />
                            ) : compositions.length > 0 ? (
                                loopComposition
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

CompositionHome.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    compositions: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionComposition: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ profile, compositions }) {
    return {
        profile,
        compositions,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionComposition: bindActionCreators(actionComposition, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CompositionHome);
