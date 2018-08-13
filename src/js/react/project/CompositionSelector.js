import React from 'react';
import PropTypes from 'prop-types';
import * as client from '../../client';
import Button from '../unit/Button';

const CompositionSelector = ({
    id,
    selectedLaneIdx,
    selectedCollection,
    lanes,
    bans,
    selectLane,
    onSubmit,
    submitting,
}) => {
    const loopLane = lanes.map((lane, index) => {
        const champion = lane.champion;
        const position = lane.position;
        const highlightStyle =
            index === selectedLaneIdx && selectedCollection === 'lanes' ? 'highlight' : '';
        const championAvatar = client.CHAMPION_AVATAR + champion.key + '.png';
        return (
            <li
                key={`lane-${position}`}
                id={`lane-${position}`}
                className={`champion-selection d-flex align-items-center ${highlightStyle}`}
                onClick={() => selectLane(index, 'lanes')}
            >
                {champion.key ? (
                    <img
                        className="champion-image bg-dark"
                        src={championAvatar}
                        alt={champion.name}
                    />
                ) : (
                    <div className="champion-image bg-dark" />
                )}
                <span className="champion-lane">{position}:</span>
                <span className="champion-name">{champion.name}</span>
            </li>
        );
    });
    const loopBans = bans.map((item, index) => {
        const champion = item.champion;
        const highlightStyle =
            index === selectedLaneIdx && selectedCollection === 'bans' ? 'highlight' : '';
        const championAvatar = client.CHAMPION_AVATAR + champion.key + '.png';
        return (
            <div
                key={`ban-${index}`}
                id={`ban-${index}`}
                className={`champion-ban ${highlightStyle}`}
                onClick={() => selectLane(index, 'bans')}
            >
                {champion.key ? (
                    <img
                        className="champion-image bg-dark"
                        src={championAvatar}
                        alt={champion.name}
                    />
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
                label={
                    id && submitting
                        ? 'Updating...'
                        : id ? 'Update' : submitting ? 'Publishing...' : 'Publish'
                }
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
    lanes: PropTypes.arrayOf(PropTypes.object).isRequired,
    bans: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectLane: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
};

CompositionSelector.defaultProps = {
    id: null,
};

export default CompositionSelector;
