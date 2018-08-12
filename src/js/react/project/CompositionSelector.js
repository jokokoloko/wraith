import React from 'react';
import PropTypes from 'prop-types';
import * as client from '../../client';
import Button from '../unit/Button';

const CompositionSelector = ({ id, selectedLaneIdx, lanes, selectLane, onSubmit, submitting }) => {
    const loopLane = lanes.filter((item) => item.type === 'pick').map((lane, index) => {
        const champion = lane.champion;
        const position = lane.position;
        const highlightStyle = index === selectedLaneIdx ? 'highlight' : '';
        const championAvatar = champion.image ? client.CHAMPION_AVATAR + champion.image.full : null;
        return (
            <li
                key={`lane-${position}`}
                id={`lane-${position}`}
                className={`champion-selection champion-${champion.id || 'none'} d-flex align-items-center ${highlightStyle}`}
                onClick={() => selectLane(index)}>
                {champion.key ? (
                    <img className="champion-image bg-dark" src={championAvatar} alt={champion.name} />
                ) : (
                    <div className="champion-image bg-dark" />
                )}
                <span className="champion-lane">{position}:</span>
                <span className="champion-name">{champion.name}</span>
            </li>
        );
    });
    const loopBans = lanes.filter((item) => item.type === 'ban').map((item, index) => {
        const champion = item.champion;
        let realIdx = selectedLaneIdx - 5; //eeew hardcoded.
        const highlightStyle = index === realIdx ? 'highlight' : '';
        const championAvatar = champion.image ? client.CHAMPION_AVATAR + champion.image.full : null;
        return (
            <div key={`ban-${index}`} id={`ban-${index}`} className={`champion-ban ${highlightStyle}`} onClick={() => selectLane(index + 5)}>
                {champion.key ? (
                    <img className="champion-image bg-dark" src={championAvatar} alt={champion.name} />
                ) : (
                    <div className="champion-image bg-dark" />
                )}
            </div>
        );
    });
    return (
        <div className="team-selection panel">
            <ul className="team-composition">{loopLane}</ul>
            <h3>Bans:</h3>
            <div className="team-bans">{loopBans}</div>
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
    lanes: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectLane: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
};

CompositionSelector.defaultProps = {
    id: null,
};

export default CompositionSelector;
