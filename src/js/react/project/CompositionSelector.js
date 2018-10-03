import React from 'react';
import PropTypes from 'prop-types';
import * as client from '../../client';
import Button from '../unit/Button';
import lane from '../../../img/icon-lane-none.png';

const CompositionSelector = ({ id, selectedLaneIdx, selectedCollection, picks, bans, selectLane, onSubmit, submitting }) => {
    // const generateAvatar = (champion, championAvatar) => {
    //     if (champion.key && champion.name) {
    //         return <img className="champion-image" src={championAvatar} alt={champion.name} />;
    //     } else if (champion.type === 'wildcard') {
    //         return (
    //             <div className="champion-image cell">
    //                 <div className={`role-wildcard bg-${champion.role}-icon`} />
    //             </div>
    //         );
    //     } else {
    //         return <div className="champion-image cell" />;
    //     }
    // };
    const generateAvatar = (champion, championAvatar) => (
        <div className="cell">
            <div className="membrane">
                <div className="nucleus">
                    <img className="icon-lane img-fluid exact-center" src={lane} alt="" />
                </div>
            </div>
        </div>
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
                {generateAvatar(champion, championAvatar)}

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
                {generateAvatar(champion, championAvatar)}
            </li>
        );
    });
    return (
        <div id="composition">
            <ul className="composition-picks list-reset">{loopPick}</ul>
            <ul className="composition-bans list-reset d-flex justify-content-between">{loopBan}</ul>
            <Button
                type="button"
                name="register"
                label={id && submitting ? 'Updating...' : id ? 'Update' : submitting ? 'Locking In...' : 'Lock In'}
                kind={id ? 'primary' : 'success'}
                size="lg"
                display="block"
                onClick={onSubmit}
                disabled={submitting}
            />
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
