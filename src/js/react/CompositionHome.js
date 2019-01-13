import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { filter, forEach, sortBy } from 'lodash';
// import * as actionComposition from '../redux/action/actionComposition';
import { COMPOSITIONS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import { arrayToObject } from '../function';
import * as client from '../client';
import * as path from '../path';
import { buildLanes } from '../utilities';
import apiComposition from '../../api/apiComposition';
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
            compositions: [],
            compositionsToShow: [],
            loadingCompositions: true,
            filters: {
                sort: 'newest',
                lanes: {}
            }
        }
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.getPagedComps = this.getPagedComps.bind(this);
        this.filterChamps = this.filterChamps.bind(this);
        this.applyHandler = this.applyHandler.bind(this);
    }
    componentDidMount() {
        const { pageSize } = this.state;
        apiComposition.compositionsLoad()
            .then(data => {
                console.log('my comps', data);
                const compositionsToShow = this.applyFilters(data);
                this.setState(() => ({
                    compositions: data,
                    loadingCompositions: false,
                    compositionsToShow,
                }));
            });
    }
    toggleLoading() {
        this.setState((state) => {
            return { loadingCompositions: !state.loadingCompositions };
        });
    }
    applyFilters(comps) {
        const { sort, lanes } = this.state.filters;
        //do filters for champs first
        let filteredComps = filter(comps, (comp, key) => {
            let isMatch = true;
            forEach(lanes, (champId, lane) => {
                if (comp.pick[lane] !== champId) {
                    isMatch = false;
                    return false;
                }
            });
            return isMatch;
        });
        if (sort === 'newest') {
            return sortBy(filteredComps, [(item) => {
                return item.time.created;
            }]).reverse();
        }
        return filteredComps;
    }
    nextPage() {
        const { curPage, pageSize, compositionsToShow } = this.state;
        const newStart = curPage * pageSize;
        if (newStart < compositionsToShow.length) {
            this.setState(() => ({
                curPage: curPage + 1
            }));
        }
    }
    prevPage() {
        const { curPage } = this.state;
        let newPage = curPage - 1;
        if (newPage < 1) {
            newPage = 1;
        }
        this.setState(() => ({
            curPage: newPage
        }));
    }
    filterChamps(position, champ) {
        let { compositions, filters } = this.state;
        let { lanes } = filters;
        if (champ === "none") {
            delete lanes[position];
        }
        else {
            lanes[position] = champ;
        }
        this.setState(() => ({
            filters: {
                ...filters,
                lanes
            }
        }));
    }
    applyHandler() {
        let { compositions } = this.state;
        let filteredComps = this.applyFilters(compositions);
        this.setState(() => ({
            compositionsToShow: filteredComps,
            curPage: 1 //reset page
        }));
    }
    getPagedComps(comps) {
        const { curPage, pageSize } = this.state;
        let start = (curPage - 1) * pageSize;
        let end = start + pageSize;
        return comps.slice(start, end);
    }
    render() {
        const { authenticated, profile, championsMap, wildcardsMap } = this.props;
        const { compositionsToShow, loadingCompositions } = this.state;
        const item = 'composition';
        const pagedComposition = this.getPagedComps(compositionsToShow);
        const loopComposition = pagedComposition.map((composition, index) => {
            const picks = buildLanes(composition.pick, championsMap, wildcardsMap);
            const loopPick = picks.map((pick, index) => {
                const { champion, position } = pick;
                const championAvatar = champion.image ? client.CHAMPION_AVATAR + champion.image.full : null;
                return (
                    <div key={`pick-${position}`} id={`pick-${position}`} className={`pick pick-${index}`}>
                        <Image source={championAvatar} alternate={champion ? champion.name : null} />
                    </div>
                );
            });
            return (
                <article key={composition.id} id={composition.id} className={`${item} ${item}-${index} node-xs-20 composition-article`}>
                    <Link to={`/${composition.id}`}>
                        <div className="card card-panel container">
                            <div className="card-body row composition-details">
                                <div className="composition-pick col-6">{loopPick}</div>
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
                    <CompositionListFilter championsMap={championsMap}
                        filterChamps={this.filterChamps}
                        apply={this.applyHandler}/>
                    <Pager next={this.nextPage} previous={this.prevPage} />
                    <Feed space="space-xs-50">
                        <section>
                            {loadingCompositions ? (
                                <Loader position="exact-center fixed" label="Loading compositions" />
                            ) : compositionsToShow.length > 0 ? (
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
    // loadingCompositions: PropTypes.bool.isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    // compositions: PropTypes.arrayOf(PropTypes.object).isRequired,
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    wildcardsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    // actionComposition: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ profile, champions, wildcards }) {
    const championsMap = arrayToObject(champions, 'id');
    const wildcardsMap = arrayToObject(wildcards, 'id');
    return {
        profile,
        championsMap,
        wildcardsMap,
    };
}

export default connect(
    mapStateToProps
)(CompositionHome);
