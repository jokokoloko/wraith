import React, { useState, useCallback, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { slugify, excerptify, arrayToObject } from '../function';
import * as path from '../path';
import { buildLanes, isFull, findNextEmpty } from '../utilities';
import Basic from '../react/section/Basic';
import Affix from '../react/unit/Affix';
import Champion from './Champion';
import ChampionInformation from './ChampionInformation';
import CompositionMeta from './CompositionMeta';
import CompositionSelector from './CompositionSelector';
import { AccountContext } from '../account-context';
import { LegacyRandomContext } from '../legacy-random-context';

const picksBansEmpty = {
    picks: [
        {
            champion: {},
            position: 'top',
        },
        {
            champion: {},
            position: 'jungle',
        },
        {
            champion: {},
            position: 'middle',
        },
        {
            champion: {},
            position: 'bottom',
        },
        {
            champion: {},
            position: 'support',
        },
    ],
    bans: [
        {
            champion: {},
            position: 'top',
        },
        {
            champion: {},
            position: 'jungle',
        },
        {
            champion: {},
            position: 'middle',
        },
        {
            champion: {},
            position: 'bottom',
        },
        {
            champion: {},
            position: 'support',
        },
    ],
};

const defaultSelectedChampionsArray = [
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
];

const validateStrategies = (strats) => {
    return strats.filter((item) => {
        return item.phase && item.phase.length > 0 && item.strategy && item.strategy.length > 0;
    });
};

function _CompositionEdit({ history }) {
    const { authenticated } = useContext(AccountContext);
    const { wildcardsMap, actionComposition } = useContext(LegacyRandomContext);
    const [id, setId] = useState();
    const [user, setUser] = useState();
    const [selectedLaneIdx, setSelectedLaneIdx] = useState(0);
    const [selectedCollection, setSelectedCollection] = useState('picks');
    const [selectedChampion, setSelectedChampion] = useState({});
    const [picks, setPicks] = useState(buildLanes());
    const [bans, setBans] = useState(buildLanes());
    const [selectedChampionsArray, setSelectedChampionsArray] = useState(defaultSelectedChampionsArray);
    const [formData, setFormData] = useState({});

    const selectLane = useCallback(
        (selLaneIdx, selCollection) => {
            setSelectedLaneIdx(selLaneIdx);
            setSelectedCollection(selCollection);
        },
        [setSelectedLaneIdx, setSelectedCollection],
    );

    const selectChampion = useCallback(
        (selectedChampion) => {
            if (selectedLaneIdx === undefined || selectedLaneIdx === -1) return;

            if (selectedChampionsArray.find((item) => item.id === selectedChampion.id)) {
                // should set some sort of exceptional case here so that the user knows they made a mistake.
                return;
            }

            const index = selectedCollection === 'picks' ? selectedLaneIdx : selectedLaneIdx + 5;

            const newSelectedChampionsArray = [...selectedChampionsArray];
            newSelectedChampionsArray[index] = selectedChampion;
            setSelectedChampionsArray(newSelectedChampionsArray);
        },
        [selectedChampionsArray, selectedLaneIdx, selectedCollection],
    );

    useEffect(() => console.log(formData), [formData]);

    // if any sort of update to the array of picks happens then update the previous values that were being used to manage them.
    useEffect(() => {
        const generatePickBans = (champArray) =>
            champArray.reduce((map, obj, idx) => {
                if (obj && obj.name) {
                    if (idx >= 5) {
                        // bans
                        map.bans[idx - 5].champion = obj;
                    } else {
                        // picks
                        map.picks[idx].champion = obj;
                    }
                }
                return map;
            }, picksBansEmpty);

        const pickBans = generatePickBans(selectedChampionsArray);

        setPicks(pickBans.picks);
        setBans(pickBans.bans);

        // seems overly complicated to do this this way but it is compatible with the existing structure and function
        const newSelectedLaneIdx = findNextEmpty(pickBans.picks, selectedLaneIdx);
        if (newSelectedLaneIdx === -1) {
            const isEmpty = pickBans.bans.reduce((resp, val) => resp && !val.champion.name, true);
            const newBanSelectedIdx = findNextEmpty(pickBans.bans, isEmpty ? 0 : selectedLaneIdx);
            setSelectedLaneIdx(newBanSelectedIdx);
            setSelectedCollection('bans');
        } else {
            setSelectedLaneIdx(newSelectedLaneIdx);
            setSelectedCollection('picks');
        }
    }, [selectedChampionsArray, setPicks, setBans, setSelectedLaneIdx, setSelectedCollection]);

    const onSubmit = useCallback(() => {
        const pick = picks.reduce((prev, value) => ({ ...prev, [value.position]: value.champion.id || wildcardsMap.wildcardFill.id }), {});
        const ban = bans.reduce((prev, value) => {
            return { ...prev, [value.position]: value.champion.id || wildcardsMap.wildcardFill.id };
        }, {});

        const { title, strategy, formNotePicks, formNoteBans, formStrategies } = formData;
        const excerpt = excerptify(strategy, 210);
        const slug = slugify(title) || id;

        const data = {
            meta: {
                title,
                description: strategy,
                excerpt,
            },
            notePick: {
                general: formNotePicks.general,
                lanes: {
                    top: formNotePicks.lanes[0],
                    jungle: formNotePicks.lanes[1],
                    middle: formNotePicks.lanes[2],
                    bottom: formNotePicks.lanes[3],
                    support: formNotePicks.lanes[4],
                },
            },
            noteBan: {
                general: formNoteBans.general,
                lanes: {
                    top: formNoteBans.lanes[0],
                    jungle: formNoteBans.lanes[1],
                    middle: formNoteBans.lanes[2],
                    bottom: formNoteBans.lanes[3],
                    support: formNoteBans.lanes[4],
                },
            },
            strategies: validateStrategies(formStrategies),
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
    }, [authenticated, history, actionComposition, wildcardsMap, id, user, picks, bans, formData]);

    useEffect(() => console.log(picks), [picks]);
    useEffect(() => console.log(bans), [bans]);

    return (
        <main id="main" className="composition-edit" role="main">
            <div className="container-fluid">
                <Basic space="space-xs-50">
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
                                />
                            </Affix>
                        </div>
                        <div className="col">
                            <Champion selectChampion={selectChampion} />
                            {authenticated && <CompositionMeta onChange={setFormData} />}
                        </div>
                        {!authenticated && (
                            <div className="col-auto">
                                <ChampionInformation champion={selectedChampion} />
                            </div>
                        )}
                    </div>
                </Basic>
            </div>
        </main>
    );
}

_CompositionEdit.propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _CompositionEdit;
