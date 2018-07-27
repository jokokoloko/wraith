import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CHAMPIONS_LOAD_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import Loader from '../unit/Loader';

const Champion = ({ loadingChampions, champions, selectChampion, filters }) => {
    const item = 'champion';
    const shouldDisplay = (champ) => {
        // first filter by role
        let roleMatch = true;
        if (filters.role) {
            roleMatch = champ.tags[filters.role];
        }
        return roleMatch && champ.name.toLowerCase().indexOf(filters.name.toLowerCase()) >= 0;
    };
    const loopChampion = champions.map((champion, index) => {
        const count = index + 1;
        const sprite = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/${champion.image.sprite}`;
        const style = {
            backgroundImage: `url('${sprite}')`,
            backgroundPosition: `-${champion.image.x}px -${champion.image.y}px`,
        };
        // basically show the <li> if filtering matches
        const displayClass = shouldDisplay(champion) ? 'd-flex' : 'd-none';
        return (
            <li key={champion.id} id={champion.id} className={`${item} ${item}-${count} col ${displayClass} justify-content-center`}>
                <div className="champion-profile d-flex flex-column align-items-center" onClick={() => selectChampion(champion)}>
                    <div className="champion-image" style={style} />
                    <h3 className="champion-name">{champion.name}</h3>
                </div>
            </li>
        );
    });
    return loadingChampions ? (
        <Loader label="Loading champions" />
    ) : (
        <ul className="champion-grid row gutter-30 panel text-center">{loopChampion}</ul>
    );
};

Champion.propTypes = {
    loadingChampions: PropTypes.bool.isRequired,
    champions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps({ calls, champions }) {
    return {
        loadingChampions: findByString(calls, removeStatus(CHAMPIONS_LOAD_REQUEST)),
        champions,
    };
}

export default connect(mapStateToProps)(Champion);
