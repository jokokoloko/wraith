import React from 'react';
import PropTypes from 'prop-types';
import * as client from '../../client';
import Button from '../unit/Button';

const CompositionSelector = ({ selectedLaneIdx, lanes, selectLane, onSubmit }) => {
    const loopLane = lanes.map((lane, index) => {
        const champion = lane.champion;
        const position = lane.position;
        const highlightStyle = index === selectedLaneIdx ? 'highlight' : '';
        const championAvatar = client.CHAMPION_AVATAR + champion.key + '.png';
        return (
            <li
                key={`lane-${position}`}
                id={`lane-${position}`}
                className={`champion-selection d-flex align-items-center ${highlightStyle}`}
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
    return (
        <div className="team-selection panel">
            <ul className="team-composition">{loopLane}</ul>
            <Button
                type="button"
                name="register"
                label={false ? 'Saving...' : 'Save'}
                kind="success"
                size="lg"
                display="block"
                onClick={onSubmit}
                disabled={false}
            />
        </div>
    );
};

CompositionSelector.propTypes = {
    selectedLaneIdx: PropTypes.number.isRequired,
    lanes: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectLane: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CompositionSelector;
