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
import { buildLanes } from '../composition';
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
            selectedCollection: 'picks',
            selectedChampion: {},
            // this is object for tracking the champions selected per collection and lane
            // e.g. { picks: { annie: 0, aatrox: 1 }, bans: { blitz: 0 } }
            championsSelected: { picks: {}, bans: {} },
            picks: buildLanes(),
            bans: buildLanes(),
            form: {},
            formNotes: { top: {}, jungle: {}, middle: {}, bottom: {}, support: {} },
            formStrategies: { '1': {}},
            strategyCounter: 1
        };
        this.selectLane = this.selectLane.bind(this);
        this.selectChampion = this.selectChampion.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addStrategy = this.addStrategy.bind(this);
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
    setInitialStateForEdit(view) {
        const { championsMap } = this.props;
        const { championsSelected } = this.state;
        const picks = buildLanes(view.pick, championsMap);
        const bans = buildLanes(view.ban, championsMap);
        picks.forEach((pick, index) => {
            championsSelected.picks[pick.champion.name] = index;
        });
        bans.forEach((ban, index) => {
            championsSelected.bans[ban.champion.name] = index;
        });
        let stateObj = {
            id: view.id,
            user: view.user,
            form: view.meta,
            championsSelected,
            picks,
            bans,
        };
        //conditionally add other data if present.
        if (view.strategies) {
            let formStrategies = {};
            stateObj.strategyCounter = view.strategies.length;
            view.strategies.forEach((item, idx) => {
                formStrategies[idx + 1] = item;
            });
        }
        if (view.note) {
            stateObj.formNotes = view.note;
        }
        this.setState(stateObj);
    }
    removeFromChampionsSelected(newChampion, oldChampion) {
        const { championsSelected, picks, bans } = this.state;
        const { picks: picksSelected, bans: bansSelected } = championsSelected;
        delete picksSelected[oldChampion];
        delete bansSelected[oldChampion];
        if (picksSelected.hasOwnProperty(newChampion)) {
            picks[picksSelected[newChampion]].champion = {};
            delete picksSelected[newChampion];
        }
        if (bansSelected.hasOwnProperty(newChampion)) {
            bans[bansSelected[newChampion]].champion = {};
            delete bansSelected[newChampion];
        }
        this.setState({
            championsSelected: { picksSelected, bansSelected },
            picks,
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
        let { selectedLaneIdx, championsSelected, selectedCollection, picks, bans } = this.state;
        let curCollection = this.state[selectedCollection];
        let curChampSelected = curCollection[selectedLaneIdx].champion;
        if (curChampSelected.name && curChampSelected.name === selectedChampion.name) return;
        // if champion is already selected, remove it from the other lane
        this.removeFromChampionsSelected(selectedChampion.name, curChampSelected.name);
        // add champion to champions selected
        championsSelected[selectedCollection][selectedChampion.name] = selectedLaneIdx;
        // put champion in current lane index
        curCollection[selectedLaneIdx].champion = selectedChampion;
        // increase lane index
        selectedLaneIdx = Math.min(curCollection.length - 1, selectedLaneIdx + 1);
        // set the state
        this.setState({
            selectedLaneIdx,
            selectedChampion,
            championsSelected,
            picks,
            bans,
        });
    }
    onChange(event, formType) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        const group = target.dataset.group;
        const newData = group
            ? {
                  ...this.state[formType],
                  [group]: {
                      ...this.state[formType][group],
                      [field]: value,
                  },
              }
            : {
                  ...this.state[formType],
                  [field]: value,
              };
        this.setState({
            [formType]: newData,
        });
    }
    addStrategy() {
        let { strategyCounter, formStrategies } = this.state;
        strategyCounter++;
        formStrategies[strategyCounter] = {};
        this.setState({
            strategyCounter,
            formStrategies
        });
    }
    onSubmit() {
        const { history, authenticated, actionComposition } = this.props;
        const { id, user, picks, bans, form, formNotes, formStrategies } = this.state;
        const slug = slugify(form.title) || id;
        const excerpt = excerptify(form.description, 210);
        let pick = {},
            ban = {};
        picks.forEach((picked, idx) => {
            pick[picked.position] = picked.champion.id || null;
        });
        bans.forEach((banned, idx) => {
            ban[banned.position] = banned.champion.id || null;
        });
        let strategies = [];
        Object.keys(formStrategies).forEach((key) => {
            strategies.push(formStrategies[key]);
        });
        const data = {
            meta: {
                ...form,
                excerpt,
            },
            note: {
                ...formNotes
            },
            strategies,
            id,
            slug,
            user,
            pick,
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
        const { id, selectedLaneIdx, selectedCollection, selectedChampion, picks, bans, form, formNotes, formStrategies } = this.state;
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
                                            picks={picks}
                                            bans={bans}
                                            selectLane={this.selectLane}
                                            onSubmit={this.onSubmit}
                                            submitting={submitting}
                                        />
                                    </Affix>
                                </div>
                                <div className="col-6">
                                    <Champion selectChampion={this.selectChampion} />
                                    {authenticated &&
                                        <CompositionMeta
                                            form={form}
                                            onChange={this.onChange}
                                            formNotes={formNotes}
                                            formStrategies={formStrategies}
                                            addStrategy={this.addStrategy}
                                        />}
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

export default connect(mapStateToProps, mapDispatchToProps)(_CompositionEdit);
