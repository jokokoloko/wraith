import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionView from '../redux/action/actionView';
import * as actionComposition from '../redux/action/actionComposition';
import { VIEW_LOAD_REQUEST, COMPOSITION_SAVE_REQUEST } from '../redux/type';
import { COMPOSITIONS } from '../data';
import { findByString, removeStatus } from '../filter';
import { slugify, excerptify, arrayToObject } from '../function';
import * as path from '../path';
import { formatLanes } from '../composition';
import CompositionMeta from './project/CompositionMeta';
import CompositionSelector from './project/CompositionSelector';
import Champion from './project/Champion';
import ChampionInformation from './project/ChampionInformation';
import Basic from './section/Basic';
import Affix from './unit/Affix';
import Loader from './unit/Loader';

class _CompositionEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            user: null,
            selectedLaneIdx: 0,
            selectedCollection: 'lanes',
            selectedChampion: {},
            // this is object for tracking champs pick for what lanes.
            // e.g. { lanes: { annie: 0, aatrox: 1 }, bans: { blitz: 0 } }
            champsPicked: { lanes: {}, bans: {} },
            lanes: this.laneObjInit(),
            bans: this.laneObjInit(),
            form: {},
        };
        this.selectLane = this.selectLane.bind(this);
        this.selectChampion = this.selectChampion.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const { history, match, actionView } = this.props;
        match.params.id &&
            actionView.viewLoad(match.params.id, COMPOSITIONS, true).then((composition) => !composition.view && history.push(path.Root));
    }
    componentDidUpdate(prevProps) {
        const { match, view } = this.props;
        match.params.id && view !== prevProps.view && this.setInitialStateForEdit(view);
    }
    laneObjInit() {
        return [
            { position: 'top', champion: {} },
            { position: 'jungle', champion: {} },
            { position: 'middle', champion: {} },
            { position: 'bottom', champion: {} },
            { position: 'support', champion: {} },
        ];
    }
    setInitialStateForEdit(view) {
        const { championsMap } = this.props;
        const { champsPicked } = this.state;
        const picksArray = view.lane ? Object.keys(view.lane) : [];
        const bansArray = view.ban ? Object.keys(view.ban) : [];
        const picks = formatLanes(picksArray, view.lane, championsMap);
        const bans = formatLanes(bansArray, view.ban, championsMap);
        picks.forEach((pick, index) => {
            champsPicked.lanes[pick.champion.name] = index;
        });
        bans.forEach((ban, index) => {
            champsPicked.bans[ban.champion.name] = index;
        });
        this.setState({
            id: view.id,
            user: view.user,
            form: view.meta,
            champsPicked,
            lanes: picks,
            bans,
        });
    }
    removeFromChampsPicked(newChamp, oldChamp) {
        const { lanes, bans } = this.state;
        const { lanes: lanePicks, bans: banPicks } = this.state.champsPicked;
        delete lanePicks[oldChamp];
        delete banPicks[oldChamp];
        if (lanePicks.hasOwnProperty(newChamp)) {
            lanes[lanePicks[newChamp]].champion = {};
            delete lanePicks[newChamp];
        }
        if (banPicks.hasOwnProperty(newChamp)) {
            bans[banPicks[newChamp]].champion = {};
            delete banPicks[newChamp];
        }
        this.setState({
            champsPicked: { lanePicks, banPicks },
            lanes,
            bans,
        });
    }
    selectLane(selectedLaneIdx, selectedCollection) {
        this.setState({
            selectedLaneIdx,
            selectedCollection,
        });
    }
    selectChampion(selectedChampion) {
        let { selectedLaneIdx, champsPicked, selectedCollection, lanes, bans } = this.state;
        let curCollection = this.state[selectedCollection];
        let curChampSelected = curCollection[selectedLaneIdx].champion;
        if (curChampSelected.name && curChampSelected.name === selectedChampion.name) return;
        // if champion is picked before, remove it from the other lane.
        this.removeFromChampsPicked(selectedChampion.name, curChampSelected.name);
        // add champion to champions picked
        champsPicked[selectedCollection][selectedChampion.name] = selectedLaneIdx;
        // put champion in current lane index
        curCollection[selectedLaneIdx].champion = selectedChampion;
        // increase lane index
        selectedLaneIdx = Math.min(curCollection.length - 1, selectedLaneIdx + 1);
        // set the state
        this.setState({
            selectedLaneIdx,
            selectedChampion,
            champsPicked,
            lanes,
            bans,
        });
    }
    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        const group = target.dataset.group;
        const form = group
            ? {
                  ...this.state.form,
                  [group]: {
                      ...this.state.form[group],
                      [field]: value,
                  },
              }
            : {
                  ...this.state.form,
                  [field]: value,
              };
        this.setState({
            form,
        });
    }
    onSubmit() {
        const { history, authenticated, actionComposition } = this.props;
        const { id, user, lanes, bans, form } = this.state;
        const slug = slugify(form.title) || id;
        const excerpt = excerptify(form.description, 210);
        let lane = {},
            ban = {};
        lanes.forEach((pick, idx) => {
            lane[pick.position] = pick.champion.id || null;
        });
        bans.forEach((banned, idx) => {
            ban[banned.position] = banned.champion.id || null;
        });
        const data = {
            meta: {
                ...form,
                excerpt,
            },
            id,
            user,
            slug,
            lane,
            ban,
        };
        actionComposition.compositionSave(data).then((composition) => {
            if (authenticated && composition) {
                history.push(`${path._Edit}/${composition.id}`);
            } else if (!authenticated) {
                history.push(path.Register);
            }
        });
    }
    render() {
        const { loadingView, submitting, authenticated } = this.props;
        const { id, selectedLaneIdx, selectedCollection, selectedChampion, lanes, bans, form } = this.state;
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-50">
                        {loadingView ? (
                            <Loader position="exact-center fixed" label="Loading view" />
                        ) : (
                            <div className="row gutter-50 gutter-80">
                                <div className="col-3">
                                    <Affix>
                                        <CompositionSelector
                                            id={id}
                                            selectedLaneIdx={selectedLaneIdx}
                                            selectedCollection={selectedCollection}
                                            picks={lanes}
                                            bans={bans}
                                            selectLane={this.selectLane}
                                            onSubmit={this.onSubmit}
                                            submitting={submitting}
                                        />
                                    </Affix>
                                </div>
                                <div className="col-6">
                                    <Champion selectChampion={this.selectChampion} />
                                    {authenticated && <CompositionMeta form={form} onChange={this.onChange} />}
                                </div>
                                <div className="col-3">
                                    <ChampionInformation champion={selectedChampion} />
                                </div>
                            </div>
                        )}
                    </Basic>
                </div>
            </main>
        );
    }
}

_CompositionEdit.propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    authenticated: PropTypes.bool.isRequired,
    loadingView: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    view: PropTypes.objectOf(PropTypes.any).isRequired,
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
    actionComposition: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ view, calls, champions }) {
    const championsMap = arrayToObject(champions, 'id');
    return {
        loadingView: findByString(calls, removeStatus(VIEW_LOAD_REQUEST)),
        submitting: findByString(calls, removeStatus(COMPOSITION_SAVE_REQUEST)),
        view,
        championsMap,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionView: bindActionCreators(actionView, dispatch),
        actionComposition: bindActionCreators(actionComposition, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(_CompositionEdit);
