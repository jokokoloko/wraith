import React, { useState, useCallback, useEffect } from 'react';
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

function _CompositionEdit(props) {
    const { loadingView, submitting, authenticated } = props;
    const [ id, setId] = useState()
    const [ selectedLaneIdx, setSelectedLaneIdx ] = useState(0)
    const [ selectedCollection, setSelectedCollection ] = useState('picks')
    const [ selectedChampion, setSelectedChampion ] = useState({})
    const [ picks, setPicks ] = useState(buildLanes())
    const [ bans, setBans ] = useState(buildLanes())
    const [ form, setForm ] = useState({})
    const [ formNotePicks, setFormNotePicks ] = useState({lanes: {}, general: ''})
    const [ formNoteBans, setFormNoteBans ] = useState({lanes: {}, general: ''})
    const [ formStrategies, setFormStrategies ] = useState([{}])
    const [ championsSelected, setChampionsSelected ] = useState({picks: {}, bans: {}})
    const [ selectedChampionsArray, setSelectedChampionsArray ] = useState([{},{},{},])

    const selectLane = useCallback((selLaneIdx, selCollection) => {
        setSelectedLaneIdx(selLaneIdx)
        setSelectedCollection(selCollection)
    }, [setSelectedLaneIdx, setSelectedCollection])

    const removeFromChampionsSelected = useCallback((newChampion, oldChampion) => {
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

        setSelectedChampion({ picksSelected, bansSelected })
        setPicks(picks)
        setBans(bans)
    }, [championsSelected, setSelectedChampion, setPicks, setBans])

    const selectChampion = useCallback(() => {
        if (selectedLaneIdx === undefined || selectedLaneIdx === -1) return;

        let curCollection = this.state[selectedCollection];
        let curChampSelected = curCollection[selectedLaneIdx].champion;
        if (selectedChampion.type && selectedChampion.type === 'wildcard') {
            if (curChampSelected.id && curChampSelected.id === selectedChampion.id) return;
            // if champion is already selected, remove it from the other lane
            //pass id because wildcards have no name
            removeFromChampionsSelected(selectedChampion.id, curChampSelected.name);
            // put wildcard in current lane index
            curCollection[selectedLaneIdx].champion = selectedChampion;
        } else {
            if (curChampSelected.name && curChampSelected.name === selectedChampion.name) return;
            // if champion is already selected, remove it from the other lane
            removeFromChampionsSelected(selectedChampion.name, curChampSelected.name);
            // add champion to champions selected
            championsSelected[selectedCollection][selectedChampion.name] = selectedLaneIdx;
            // put champion in current lane index
            curCollection[selectedLaneIdx].champion = selectedChampion;
        }
        // if the current list is full, switch the collection
        if (isFull(curCollection)) {
            setSelectedCollection(selectedCollection === 'picks' ? 'bans' : 'picks')
            curCollection = this.state[selectedCollection];
            setSelectedLaneIdx(-1)
        } else {

            // set to the next empty index
            const newSelectedLaneIdx = findNextEmpty(curCollection, selectedLaneIdx + 1);
            setSelectedLaneIdx(newSelectedLaneIdx)
        }
        setSelectedChampion(selectedChampion)
        setSelectedCollection(selectedCollection)
        setChampionsSelected(championsSelected)
        setPicks(picks)
        setBans(bans)
        // set the state
        this.setState({
            selectedLaneIdx,
            selectedChampion,
            selectedCollection,
            championsSelected,
            picks,
            bans,
        });
    }, [
        selectedLaneIdx,
        championsSelected,
        selectedCollection,
        picks,
        bans,
        removeFromChampionsSelected,
        setSelectedLaneIdx,
        setChampionsSelected,
        setSelectedCollection,
        setPicks,
        setBans
    ])

    const onSubmit = () => {}
    const addStrategy = () => {}
    const onChange = () => {}

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
                                        selectLane={selectLane}
                                        onSubmit={onSubmit}
                                        submitting={submitting}
                                    />
                                </Affix>
                            </div>
                            <div className="col">
                                <Champion selectChampion={selectChampion} />
                                {authenticated && (
                                    <CompositionMeta
                                        form={form}
                                        formNotePicks={formNotePicks}
                                        formNoteBans={formNoteBans}
                                        formStrategies={formStrategies}
                                        addStrategy={addStrategy}
                                        onChange={onChange}
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
