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
import { buildLanes, isFull, findNextEmpty } from '../utilities';
import Basic from './section/Basic';
import Affix from './unit/Affix';
import Loader from './unit/Loader';
import Champion from './project/Champion';
import ChampionInformation from './project/ChampionInformation';
import CompositionMeta from './project/CompositionMeta';
import CompositionSelector from './project/CompositionSelector';

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
            formNotePicks: {
                lanes: {
                    top: '', jungle: '', middle: '', bottom: '', support: ''
                },
                general: ''
            },
            formNoteBans: {
                lanes: {
                    top: '', jungle: '', middle: '', bottom: '', support: ''
                },
                general: ''
            },
            formStrategies: [{}],
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
        const { championsMap, wildcardsMap } = this.props;
        const { championsSelected } = this.state;
        const picks = buildLanes(view.pick, championsMap, wildcardsMap);
        const bans = buildLanes(view.ban, championsMap, wildcardsMap);
        picks
            .filter((pick) => pick.champion.type !== 'wildcard')
            .forEach((pick, index) => {
                championsSelected.picks[pick.champion.name] = index;
            });
        bans.filter((pick) => pick.champion.type !== 'wildcard').forEach((ban, index) => {
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
            stateObj.formStrategies = [ ...view.strategies ];
        }
        if (view.notePick) {
            stateObj.formNotePicks = view.notePick;
        }
        if (view.noteBan) {
            stateObj.formNoteBans = view.noteBan;
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
        if (selectedLaneIdx === undefined || selectedLaneIdx === -1) return;

        let curCollection = this.state[selectedCollection];
        let curChampSelected = curCollection[selectedLaneIdx].champion;
        if (selectedChampion.type && selectedChampion.type === 'wildcard') {
            if (curChampSelected.id && curChampSelected.id === selectedChampion.id) return;
            // if champion is already selected, remove it from the other lane
            //pass id because wildcards have no name
            this.removeFromChampionsSelected(selectedChampion.id, curChampSelected.name);
            // put wildcard in current lane index
            curCollection[selectedLaneIdx].champion = selectedChampion;
        } else {
            if (curChampSelected.name && curChampSelected.name === selectedChampion.name) return;
            // if champion is already selected, remove it from the other lane
            this.removeFromChampionsSelected(selectedChampion.name, curChampSelected.name);
            // add champion to champions selected
            championsSelected[selectedCollection][selectedChampion.name] = selectedLaneIdx;
            // put champion in current lane index
            curCollection[selectedLaneIdx].champion = selectedChampion;
        }
        // if the current list is full, switch the collection
        if (isFull(curCollection)) {
            selectedCollection = selectedCollection === 'picks' ? 'bans' : 'picks';
            curCollection = this.state[selectedCollection];
            selectedLaneIdx = -1;
        }

        // set to the next empty index
        selectedLaneIdx = findNextEmpty(curCollection, selectedLaneIdx + 1);

        // set the state
        this.setState({
            selectedLaneIdx,
            selectedChampion,
            selectedCollection,
            championsSelected,
            picks,
            bans,
        });
    }
    addStrategy() {
        let { formStrategies } = this.state;
        formStrategies[formStrategies.length] = {};
        this.setState({
            formStrategies,
        });
    }
    onChange(event, formName, index = -1) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        const group = target.dataset.group;
        let newData;
        if (group) {
            newData = {
                ...this.state[formName],
                [group]: {
                  ...this.state[formName][group],
                  [field]: value,
                },
            }
        }
        //the form object is an array.
        else if (index > -1) {
            newData = [...this.state[formName]];
            newData[index][field] = value;
        }
        //the form is a k-v pair
        else {
            newData = {
                ...this.state[formName],
                [field]: value,
            };
        }
        this.setState({
            [formName]: newData,
        });
    }
    validateStrategies(strats) {
        return strats.filter(item => {
            return item.phase && item.phase.length > 0
                item.strategy && item.strategy.length > 0
            });
    }
    onSubmit() {
        const { history, authenticated, actionComposition, wildcardsMap } = this.props;
        const { id, user, picks, bans, form, formNotePicks, formNoteBans, formStrategies } = this.state;
        const slug = slugify(form.title) || id;
        const excerpt = excerptify(form.description, 210);
        let pick = {},
            ban = {};
        picks.forEach((picked, idx) => {
            pick[picked.position] = picked.champion.id || wildcardsMap.wildcardFill.id;
        });
        bans.forEach((banned, idx) => {
            ban[banned.position] = banned.champion.id || wildcardsMap.wildcardFill.id;
        });
        const data = {
            meta: {
                ...form,
                excerpt,
            },
            notePick: formNotePicks,
            noteBan: formNoteBans,
            strategies: this.validateStrategies(formStrategies),
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
        const { id, selectedLaneIdx, selectedCollection, selectedChampion, picks, bans, form, formNotePicks, formNoteBans, formStrategies } = this.state;
        return (
            <main id="main" className="composition-edit" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-50">
                        {loadingView ? (
                            <Loader position="exact-center fixed" label="Loading view" />
                        ) : (
                            <div className="row gutter-80">
                                <div className="col-auto">
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
                                <div className="col">
                                    <Champion selectChampion={this.selectChampion} />
                                    {authenticated && (
                                        <CompositionMeta
                                            form={form}
                                            formNotePicks={formNotePicks}
                                            formNoteBans={formNoteBans}
                                            formStrategies={formStrategies}
                                            addStrategy={this.addStrategy}
                                            onChange={this.onChange}
                                        />
                                    )}
                                </div>
                                <div className="col-auto">
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
    wildcardsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
    actionComposition: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ view, calls, champions, wildcards }) {
    const championsMap = arrayToObject(champions, 'id');
    const wildcardsMap = arrayToObject(wildcards, 'id');
    return {
        loadingView: findByString(calls, removeStatus(VIEW_LOAD_REQUEST)),
        submitting: findByString(calls, removeStatus(COMPOSITION_SAVE_REQUEST)),
        view,
        championsMap,
        wildcardsMap,
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
