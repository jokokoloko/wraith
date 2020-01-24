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


const picksBansEmpty = {
    picks: [{
        champion: {},
        position: 'top'
    },{
        champion: {},
        position: 'jungle'
    },{
        champion: {},
        position: 'middle'
    },{
        champion: {},
        position: 'bottom'
    },{
        champion: {},
        position: 'support'
    }],
    bans: [{
        champion: {},
        position: 'top'
    },{
        champion: {},
        position: 'jungle'
    },{
        champion: {},
        position: 'middle'
    },{
        champion: {},
        position: 'bottom'
    },{
        champion: {},
        position: 'support'
    }]
}


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
    const [ selectedChampionsArray, setSelectedChampionsArray ] = useState([
        {}, // top
        {}, // jg
        {}, // mid
        {}, // adc
        {}, // sup
        {}, // ban1
        {}, // ban2
        {}, // ban3
        {}, // ban4
        {}, // ban5
    ])

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

    const selectChampion = useCallback((selectedChampion) => {
        if (selectedLaneIdx === undefined || selectedLaneIdx === -1) return;

        const index = (selectedCollection === 'picks') ? selectedLaneIdx : selectedLaneIdx + 5

        const newSelectedChampionsArray = [...selectedChampionsArray]
        newSelectedChampionsArray[index] = selectedChampion
        setSelectedChampionsArray(newSelectedChampionsArray)
    }, [
        selectedChampionsArray,
        selectedLaneIdx,
        selectedCollection
    ])

    useEffect(() => {
        console.log(selectedChampionsArray)
        const generatePickBans = (champArray) => champArray.reduce((map, obj, idx) => {
            if(obj && obj.name) {
                if(idx >= 5) {
                    // bans
                    map.bans[idx - 5].champion = obj
                }
                else {
                    // picks
                    map.picks[idx].champion = obj
                }
            }
            return map
        }, picksBansEmpty)

        const picksToMap = (picks) => picks.reduce((map, obj, idx) => {
            if(obj.champion && obj.champion.name) {
                map[obj.champion.name] = idx
            }
            return map
        }, {})

        const pickBans = generatePickBans(selectedChampionsArray)
        const newChampionsSelected = {picks: picksToMap(pickBans.picks), bans: picksToMap(pickBans.bans)}
        console.log(newChampionsSelected)
        console.log(pickBans.picks)
        console.log(pickBans.bans)
        setChampionsSelected(newChampionsSelected)
        setPicks(pickBans.picks)
        setBans(pickBans.bans)

    }, [selectedChampionsArray, setChampionsSelected, setPicks, setBans])

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
