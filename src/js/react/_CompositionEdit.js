import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionView from '../redux/action/actionView';
import * as actionComposition from '../redux/action/actionComposition';
import { COMPOSITION_SAVE_REQUEST } from '../redux/type';
import { COMPOSITIONS } from '../data';
import { findByString, removeStatus } from '../filter';
import { slugify, excerptify, arrayToObject } from '../function';
import * as path from '../path';
import CompositionMeta from './project/CompositionMeta';
import CompositionSelector from './project/CompositionSelector';
import Champion from './project/Champion';
import ChampionInformation from './project/ChampionInformation';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class _CompositionEdit extends Component {
    constructor(props) {
        super(props);
        let laneObjInit = () => {
            return [
                { position: 'top', champion: {} },
                { position: 'jungle', champion: {} },
                { position: 'middle', champion: {} },
                { position: 'bottom', champion: {} },
                { position: 'support', champion: {} },
            ];
        };
        this.state = {
            loadingView: true,
            id: null,
            user: null,
            selectedLaneIdx: 0,
            selectedChampion: {},
            // this is object for tracking champs pick for what lanes.
            // e.g. { lanes: { annie: 0, aatrox: 1 }, bans: { blitz: 0 } }
            champsPicked: { lanes: {}, bans: {} },
            lanes: laneObjInit(),
            bans: laneObjInit(),
            form: {},
            selectedCollection: 'lanes',
        };
        this.selectLane = this.selectLane.bind(this);
        this.selectChampion = this.selectChampion.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const { history, match, actionView } = this.props;
        if (match.params.id) {
            actionView.viewLoad(match.params.id, COMPOSITIONS, true).then((composition) => {
                if (composition.view) {
                    this.setState({
                        loadingView: false,
                    });
                } else {
                    history.push(path.Root);
                }
            });
        } else {
            this.setState({
                loadingView: false,
            });
        }
    }
    componentDidUpdate(prevProps) {
        const { match, view } = this.props;
        match.params.id && view !== prevProps.view && this.setInitialStateHelper(view);
    }
    sortPositions(arr) {
        const order = {
            top: 1,
            jungle: 2,
            middle: 3,
            bottom: 4,
            support: 5,
        };
        return arr.sort((a, b) => {
            return order[a.position] - order[b.position];
        });
    }
    setInitialStateHelper(data) {
        const { championsMap } = this.props,
            { lane, ban } = data;
        let lanes = [],
            bans = [],
            champsPicked = { lanes: {}, bans: {} };

        Object.keys(lane).forEach((key, idx) => {
            let champ = lane[key];
            lanes.push({
                position: key,
                champion: champ ? championsMap[champ] : {},
            });
            champsPicked.lanes[championsMap[champ].name] = idx;
        });
        lanes = this.sortPositions(lanes);

        Object.keys(ban).forEach((key, idx) => {
            let champ = ban[key];
            bans.push({
                position: key,
                champion: champ ? championsMap[champ] : {},
            });
            champsPicked.bans[championsMap[champ].name] = idx;
        });
        bans = this.sortPositions(bans);

        this.setState({
            id: data.id,
            user: data.user,
            form: data.meta,
            champsPicked,
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
    removeFromChampsPicked(champName) {
        const { lanes, bans } = this.state;
        const { lanes: lanePicks, bans: banPicks } = this.state.champsPicked;
        if (lanePicks.hasOwnProperty(champName)) {
            lanes[lanePicks[champName]].champion = {};
            delete lanePicks[champName];
        }
        if (banPicks.hasOwnProperty(champName)) {
            bans[banPicks[champName]].champion = {};
            delete banPicks[champName];
        }
        this.setState({
            lanes,
            bans,
            champsPicked: { lanePicks, banPicks },
        });
    }
    selectChampion(selectedChampion) {
        let { selectedLaneIdx, champsPicked, selectedCollection, lanes, bans } = this.state;
        let curCollection = this.state[selectedCollection];
        let curChampSelected = curCollection[selectedLaneIdx].champion;
        if (curChampSelected.name && curChampSelected.name === selectedChampion.name) return;
        // if champ is picked before, remove it from the other lane.
        this.removeFromChampsPicked(selectedChampion.name);
        // add champ to champs picked
        champsPicked[selectedCollection][selectedChampion.name] = selectedLaneIdx;
        // put champ in current lane index
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
        const slug = slugify(form.title);
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
        const { submitting, authenticated } = this.props;
        const { loadingView, id, selectedLaneIdx, selectedCollection, selectedChampion, lanes, bans, form } = this.state;
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-50">
                        {loadingView ? (
                            <Loader position="exact-center fixed" label="Loading view" />
                        ) : (
                            <div className="row gutter-50 gutter-80">
                                <div className="col-3">
                                    <CompositionSelector
                                        id={id}
                                        selectedLaneIdx={selectedLaneIdx}
                                        selectedCollection={selectedCollection}
                                        lanes={lanes}
                                        bans={bans}
                                        selectLane={this.selectLane}
                                        onSubmit={this.onSubmit}
                                        submitting={submitting}
                                    />
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
    submitting: PropTypes.bool.isRequired,
    view: PropTypes.objectOf(PropTypes.any).isRequired,
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
    actionComposition: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ view, calls, champions }) {
    const championsMap = arrayToObject(champions, 'id');
    return {
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
