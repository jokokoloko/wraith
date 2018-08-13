import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionView from '../redux/action/actionView';
import { VIEW_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import { COMPOSITIONS } from '../data';
import { arrayToObject } from '../function';
import * as client from '../client';
import Basic from './section/Basic';
import Loader from './unit/Loader';
import Image from './unit/Image';

class CompositionView extends Component {
    componentDidMount() {
        const { match, actionView } = this.props;
        actionView.viewLoad(match.params.id, COMPOSITIONS);
    }
    render() {
        const { view: composition, loadingView, championsMap } = this.props;
        const lanes = composition.lane ? Object.keys(composition.lane) : [];
        const loopLane = lanes.map((lane, index) => {
            const count = index + 1;
            const champion = championsMap[composition.lane[lane]];
            const championLoading = champion ? client.CHAMPION_LOADING + champion.key + '_0.jpg' : null;
            return (
                <li key={`lane-${lane}`} id={`lane-${lane}`} className={`lane lane-${count} champion-${champion ? champion.id : 'none'} col`}>
                    <Image source={championLoading} alternate={champion ? champion.name : null} />
                    <p>{lane}</p>
                    <p>{champion ? champion.id : '-'}</p>
                    <h2>{champion ? champion.name : '-'}</h2>
                </li>
            );
        });
        return loadingView ? (
            <Loader position="exact-center fixed" label="Loading view" />
        ) : (
            <main id="main" role="main">
                <div className="container-fluid">
                    {composition.id ? (
                        <Fragment>
                            <Basic space="space-xs-50">
                                <ul className="row text-center">{loopLane}</ul>
                            </Basic>

                            {composition.meta &&
                                (composition.meta.title || composition.meta.description) && (
                                    <Basic space="space-xs-50">
                                        {composition.meta.title && (
                                            <header className="node-xs-50 text-center">
                                                <h1 className="composition-title">{composition.meta.title}</h1>
                                            </header>
                                        )}
                                        {composition.meta.description && (
                                            <section className="node-xs-50 text-center">
                                                <p className="composition-description">{composition.meta.description}</p>
                                            </section>
                                        )}
                                    </Basic>
                                )}
                        </Fragment>
                    ) : (
                        <Basic space="space-xs-50">
                            <header className="empty text-center">
                                <h1>404 - Composition</h1>
                            </header>
                        </Basic>
                    )}
                </div>
            </main>
        );
    }
}

CompositionView.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    loadingView: PropTypes.bool.isRequired,
    view: PropTypes.objectOf(PropTypes.any).isRequired,
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ view, calls, champions }) {
    const championsMap = arrayToObject(champions, 'id');
    return {
        loadingView: findByString(calls, removeStatus(VIEW_LOAD_REQUEST)),
        view,
        championsMap,
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
)(CompositionView);
