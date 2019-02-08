import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filter, forEach, sortBy } from 'lodash';
import apiComposition from '../../api/apiComposition';
import { arrayToObject } from '../function';
import * as client from '../client';
import { buildLanes } from '../utilities';
import Feed from './section/Feed';
import Pager from './widget/Pager';
import Loader from './unit/Loader';
import Image from './unit/Image';
import CompositionListFilter from './project/CompositionListFilter';

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
                lanes: {},
            },
        };
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.getPagedComps = this.getPagedComps.bind(this);
        this.filterChamps = this.filterChamps.bind(this);
        this.applyHandler = this.applyHandler.bind(this);
    }
    componentDidMount() {
        apiComposition.compositionsLoad().then((data) => {
            console.log('Compositions:', data); // remove
            const compositionsToShow = this.applyFilters(data);
            this.setState(() => ({
                compositions: data,
                loadingCompositions: false,
                compositionsToShow,
            }));
        });
    }
    toggleLoading() {
        this.setState((state) => ({
            loadingCompositions: !state.loadingCompositions,
        }));
    }
    applyFilters(comps) {
        const { sort, lanes } = this.state.filters;
        // do filters for champs first
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
            return sortBy(filteredComps, [(item) => item.time.created]).reverse();
        }
        return filteredComps;
    }
    prevPage() {
        const { curPage } = this.state;
        let newPage = curPage - 1;
        if (newPage < 1) {
            newPage = 1;
        }
        this.setState(() => ({
            curPage: newPage,
        }));
    }
    nextPage() {
        const { curPage, pageSize, compositionsToShow } = this.state;
        const newStart = curPage * pageSize;
        if (newStart < compositionsToShow.length) {
            this.setState(() => ({
                curPage: curPage + 1,
            }));
        }
    }
    filterChamps(position, champ) {
        let { filters } = this.state;
        let { lanes } = filters;
        if (champ === 'none') {
            delete lanes[position];
        } else {
            lanes[position] = champ;
        }
        this.setState(() => ({
            filters: {
                ...filters,
                lanes,
            },
        }));
    }
    applyHandler() {
        let { compositions } = this.state;
        let filteredComps = this.applyFilters(compositions);
        this.setState(() => ({
            compositionsToShow: filteredComps,
            curPage: 1, // reset page
        }));
    }
    getPagedComps(comps) {
        const { curPage, pageSize } = this.state;
        let start = (curPage - 1) * pageSize;
        let end = start + pageSize;
        return comps.slice(start, end);
    }
    render() {
        const { championsMap, wildcardsMap } = this.props;
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
                    <CompositionListFilter championsMap={championsMap} filterChamps={this.filterChamps} apply={this.applyHandler} />
                    <Pager previous={this.prevPage} next={this.nextPage} />
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
                    <Pager previous={this.prevPage} next={this.nextPage} />
                </div>
            </main>
        );
    }
}

CompositionHome.propTypes = {
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    wildcardsMap: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps({ champions, wildcards }) {
    const championsMap = arrayToObject(champions, 'id');
    const wildcardsMap = arrayToObject(wildcards, 'id');
    return {
        championsMap,
        wildcardsMap,
    };
}

export default connect(mapStateToProps)(CompositionHome);
