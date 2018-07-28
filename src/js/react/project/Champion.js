import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CHAMPIONS_LOAD_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import * as client from '../../client';
import ChampionFilter from './ChampionFilter';
import Loader from '../unit/Loader';

class Champion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                name: '',
                role: '',
            },
            roles: ['Tank', 'Mage', 'Assassin', 'Fighter', 'Marksman', 'Support'],
        };
        this.filterRole = this.filterRole.bind(this);
        this.filterName = this.filterName.bind(this);
        this.shouldDisplay = this.shouldDisplay.bind(this);
    }
    filterRole(role) {
        // capitalize the filter for now since that's how it is saved.
        const newRole = this.state.filters.role === role ? '' : role;
        const filters = {
            ...this.state.filters,
            role: newRole,
        };
        this.setState({
            filters,
        });
    }
    filterName(event) {
        const target = event.target;
        const value = target.value;
        const filters = {
            ...this.state.filters,
            name: value,
        };
        this.setState({
            filters,
        });
    }
    shouldDisplay(champion) {
        const { filters } = this.state;
        // first filter by role
        let roleMatch = true;
        if (filters.role) {
            roleMatch = champion.tags[filters.role];
        }
        return roleMatch && champion.name.toLowerCase().indexOf(filters.name.toLowerCase()) >= 0;
    }
    render() {
        const { loadingChampions, champions, selectChampion } = this.props;
        const { filters, roles } = this.state;
        const item = 'champion';
        const loopChampion = champions.map((champion, index) => {
            const count = index + 1;
            const championSprite = client.CHAMPION_SPRITE + champion.image.sprite;
            const style = {
                backgroundImage: `url('${championSprite}')`,
                backgroundPosition: `-${champion.image.x}px -${champion.image.y}px`,
            };
            const displayClass = this.shouldDisplay(champion) ? 'd-flex' : 'd-none'; // basically show the <li> if filtering matches
            return (
                <li key={champion.id} id={champion.id} className={`${item} ${item}-${count} col ${displayClass} justify-content-center`}>
                    <div className="champion-profile d-flex flex-column align-items-center" onClick={() => selectChampion(champion)}>
                        <div className="champion-image" style={style} />
                        <h3 className="champion-name">{champion.name}</h3>
                    </div>
                </li>
            );
        });
        return (
            <Fragment>
                <ChampionFilter roles={roles} filters={filters} filterRole={this.filterRole} filterName={this.filterName} />
                <ul className="champion-grid row gutter-30 panel text-center">
                    {loadingChampions ? <Loader label="Loading champions" /> : loopChampion}
                </ul>
            </Fragment>
        );
    }
}

Champion.propTypes = {
    loadingChampions: PropTypes.bool.isRequired,
    champions: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectChampion: PropTypes.func.isRequired,
};

function mapStateToProps({ calls, champions }) {
    return {
        loadingChampions: findByString(calls, removeStatus(CHAMPIONS_LOAD_REQUEST)),
        champions,
    };
}

export default connect(mapStateToProps)(Champion);
