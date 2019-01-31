import React from 'react';
import PropTypes from 'prop-types';
import * as client from '../../client';
import Cell from './Cell';
import IconLane from './IconLane';

const CompositionSelector = ({ id, selectedLaneIdx, selectedCollection, picks, bans, selectLane, onSubmit, submitting }) => {
    const generateAvatar = (champion, championAvatar, position) => (
        <Cell>
            {champion.id ? (
                <img className="champion-avatar exact-center" src={championAvatar} alt={champion.name} />
            ) : (
                <IconLane className="exact-center" position={position} />
            )}
        </Cell>
    );
    const loopPick = picks.map((pick, index) => {
        const { champion, position } = pick;
        const collection = 'picks';
        const count = index + 1;
        const active = selectedCollection === collection && selectedLaneIdx === index;
        const championAvatar = champion.image ? client.CHAMPION_AVATAR + champion.image.full : null;
        return (
            <li
                key={`pick-${position}`}
                id={`pick-${position}`}
                className={`pick pick-${count} d-flex align-items-center ${active ? 'active' : ''}`}
                onClick={() => selectLane(index, collection)}
            >
                {generateAvatar(champion, championAvatar, position)}

                {champion.id ? (
                    <span className="champion-name">{champion.name}</span>
                ) : active ? (
                    <span className="action">{`Pick for ${position}`}</span>
                ) : null}
            </li>
        );
    });
    const loopBan = bans.map((ban, index) => {
        const { champion, position } = ban;
        const collection = 'bans';
        const count = index + 1;
        const active = selectedCollection === collection && selectedLaneIdx === index;
        const championAvatar = champion.image ? client.CHAMPION_AVATAR + champion.image.full : null;
        return (
            <li
                key={`ban-${position}`}
                id={`ban-${position}`}
                className={`ban ban-${count} ${active ? 'active' : ''}`}
                onClick={() => selectLane(index, collection)}
            >
                {generateAvatar(champion, championAvatar, 'ban')}
            </li>
        );
    });
    return (
        <div id="composition-selector">
            <ul className="composition-picks list-reset">{loopPick}</ul>
            <ul className="composition-bans list-reset d-flex justify-content-between">{loopBan}</ul>
            <button type="button" className={`btn btn-${id ? 'main' : 'lock-in'} btn-lg btn-block`} onClick={onSubmit} disabled={submitting}>
                <div className="first">
                    <div className="second">
                        <div className="third">
                            <div className="fourth">
                                {id && submitting ? 'Updating...' : id ? 'Update' : submitting ? 'Locking In...' : 'Lock In'}
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
};

CompositionSelector.propTypes = {
    id: PropTypes.string,
    selectedLaneIdx: PropTypes.number.isRequired,
    selectedCollection: PropTypes.string.isRequired,
    picks: PropTypes.arrayOf(PropTypes.object).isRequired,
    bans: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectLane: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
};

CompositionSelector.defaultProps = {
    id: null,
};

export default CompositionSelector;
