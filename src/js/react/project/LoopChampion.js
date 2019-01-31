import React from 'react';
import PropTypes from 'prop-types';
import * as client from '../../client';
import Cell from './Cell';

const LoopChampion = ({ collection }) =>
    collection.map((lane, index) => {
        const { champion, position } = lane;
        const count = index + 1;
        const championAvatar = champion.image ? client.CHAMPION_AVATAR + champion.image.full : null;
        return (
            <li key={`lane-${position}`} id={`lane-${position}`} className={`lane lane-${count}`}>
                <Cell>
                    <img className="champion-avatar exact-center" src={championAvatar} alt={champion.name} />
                </Cell>
            </li>
        );
    });

LoopChampion.propTypes = {
    collection: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LoopChampion;
