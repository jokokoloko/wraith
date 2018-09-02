import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionComposition from '../redux/action/actionComposition';
import { COMPOSITIONS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import { arrayToObject } from '../function';
import * as client from '../client';
import * as path from '../path';
import { buildLanes } from '../composition';
import Basic from './section/Basic';
import Feed from './section/Feed';
import Loader from './unit/Loader';
import Image from './unit/Image';

class CompositionHome extends Component {
    componentDidMount() {
        const { actionComposition } = this.props;
        actionComposition.compositionsLoad();
    }
    render() {
        const { authenticated, loadingCompositions, profile, compositions, championsMap, wildcardsMap } = this.props;
        const item = 'composition';
        const loopComposition = compositions.map((composition, index) => {
            const count = compositions.length - index;
            const picks = buildLanes(composition.pick, championsMap, wildcardsMap);
            const loopPick = picks.map((pick, index) => {
                const count = index + 1;
                const { champion, position } = pick;
                const championAvatar = champion.image ? client.CHAMPION_AVATAR + champion.image.full : null;
                return (
                    <li key={`pick-${position}`} id={`pick-${position}`} className={`pick pick-${count} col-1`}>
                        <Image source={championAvatar} alternate={champion ? champion.name : null} />
                    </li>
                );
            });
            return (
                <article key={composition.id} id={composition.id} className={`${item} ${item}-${count} node-xs-20`}>
                    <header className="card card-panel">
                        <div className="card-body">
                            <ul className="composition-pick row">{loopPick}</ul>
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
                    <Basic space="space-xs-50">
                        <header>
                            <h1>Compositions</h1>
                        </header>
                    </Basic>

                    <Feed space="space-xs-50" item={item}>
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
    loadingCompositions: PropTypes.bool.isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    compositions: PropTypes.arrayOf(PropTypes.object).isRequired,
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    wildcardsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    actionComposition: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ profile, calls, compositions, champions, wildcards }) {
    const championsMap = arrayToObject(champions, 'id');
    const wildcardsMap = arrayToObject(wildcards, 'id');
    return {
        loadingCompositions: findByString(calls, removeStatus(COMPOSITIONS_LOAD_REQUEST)),
        profile,
        compositions,
        championsMap,
        wildcardsMap,
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
