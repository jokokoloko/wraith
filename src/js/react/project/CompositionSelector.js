import React from 'react';
import PropTypes from 'prop-types';
import * as client from '../../client';
import Button from '../unit/Button';

const CompositionSelector = ({ id, selectedLaneIdx, selectedCollection, picks, bans, selectLane, onSubmit, submitting }) => {
    const generateAvatar = (champion, championAvatar) => {
        if (champion.key && champion.name) {
            return <img className="champion-image bg-dark" src={championAvatar} alt={champion.name} />;
        } else if (champion.type === 'wildcard') {
            return (
                <div className="champion-image">
                    <div className={`role-wildcard bg-${champion.role}-icon`}></div>
                </div>
            );
        } else {
            return <div className="champion-image bg-dark" />;
        }
    };
    const loopPick = picks.map((pick, index) => {
        const collection = 'picks';
        const count = index + 1;
        const { champion, position } = pick;
        const championAvatar = champion.image ? client.CHAMPION_AVATAR + champion.image.full : null;
        const highlightStyle = selectedCollection === collection && selectedLaneIdx === index ? 'highlight' : '';
        return (
            <li
                key={`pick-${position}`}
                id={`pick-${position}`}
                className={`champion-selection pick pick-${count} d-flex align-items-center ${highlightStyle}`}
                onClick={() => selectLane(index, collection)}>
                {generateAvatar(champion, championAvatar)}
                <span className="champion-pick">{position}:</span>
                <span className="champion-name">{champion.id ? champion.name || `Any ${champion.role}` : ''}</span>
            </li>
        );
    });
    const loopBan = bans.map((ban, index) => {
        const collection = 'bans';
        const count = index + 1;
        const { champion, position } = ban;
        const championAvatar = champion.image ? client.CHAMPION_AVATAR + champion.image.full : null;
        const highlightStyle = selectedCollection === collection && selectedLaneIdx === index ? 'highlight' : '';
        return (
            <div
                key={`ban-${position}`}
                id={`ban-${position}`}
                className={`champion-ban ban ban-${count} ${highlightStyle}`}
                onClick={() => selectLane(index, collection)}>
                {generateAvatar(champion, championAvatar)}
            </div>
        );
    });
    return (
        <div className="team-selection panel">
            <ul className="team-composition">{loopPick}</ul>
            <h5>Bans:</h5>
            <div className="team-bans">{loopBan}</div>
            <Button
                type="button"
                name="register"
                label={id && submitting ? 'Updating...' : id ? 'Update' : submitting ? 'Publishing...' : 'Publish'}
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
