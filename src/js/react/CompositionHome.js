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
import CompositionListFilter from './project/CompositionListFilter';
import Pager from './widget/Pager';

class CompositionHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curPage: 1,
            pageSize: 10,
            compositionList: []
        }
    }
    componentDidMount() {
        const { actionComposition } = this.props;
        actionComposition.compositionsLoadByTime('desc', 10);
    }
    nextPage = () => {
        
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
                    <div key={`pick-${position}`} id={`pick-${position}`} className={`pick pick-${count}`}>
                        <Image source={championAvatar} alternate={champion ? champion.name : null} />
                    </div>
                );
            });
            return (
                <article key={composition.id} id={composition.id} className={`${item} ${item}-${count} node-xs-20 composition-article`}>
                    <Link to={`/${composition.id}`}>
                        <div className="card card-panel container">
                            <div className="card-body row composition-details">
                                <div className="composition-pick col-6">
                                    {loopPick}
                                </div>
                                {composition.meta.title && <h3 className="composition-title card-headline col-3">{composition.meta.title}</h3>}
                                <p className="composition-user col-3">by {composition.user}</p>
                            </div>
                        </div>
                    </Link>
                </article>
            );
        });
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-50">
                        <header>
                            <h1>Welcome to Invade.Blue</h1>
                        </header>
                    </Basic>
                    <CompositionListFilter championsMap={championsMap}/>
                    <Pager />
                    <Feed space="space-xs-50">
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
