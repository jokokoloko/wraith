import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CHAMPIONS_LOAD_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import ChampionProfile from './ChampionProfile';

//TODO: import button and add to bottom of lanes
const ChampionGrid = ({ loadingChampions, champions }) => {
    const item = 'champion';
    const loopChampion = champions.map((champion, index) => {
        const count = index + 1;
        return (
            <li key={index} id={index} className={`${item} ${item}-${count} col-1`}>
                <ChampionProfile champion={champion} index={index} />
            </li>
        );
    });
    return (
        <div className="row">
            <div className="col-4">
                Lanes
            </div>
            <div className="col-8">
                <ul className="row gutter-xs-0">{loopChampion}</ul>
            </div>
        </div>
    );
};

ChampionGrid.propTypes = {
    loadingChampions: PropTypes.bool.isRequired,
    champions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps({ calls, champions }) {
    return {
        loadingChampions: findByString(calls, removeStatus(CHAMPIONS_LOAD_REQUEST)),
        champions,
    };
}

export default connect(mapStateToProps)(ChampionGrid);
