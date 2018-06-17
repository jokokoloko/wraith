import React from 'react';
import PropTypes from 'prop-types';
import ChampionProfile from './ChampionProfile';

const ChampionGrid = ({ loadingChampions, champions }) => {
    const item = 'champion';
    const loopChampion = champions.map((champion, index) => {
        const count = index + 1;
        return (
            <li key={index} id={index} className={`${item} ${item}-${count} col-1`}>
                <ChampionProfile champion={champion} />
            </li>
        );
    });
    return (
        <ul className="row gutter-xs-0">{loopChampion}</ul>
    );
};

ChampionGrid.propTypes = {
    champions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChampionGrid;
