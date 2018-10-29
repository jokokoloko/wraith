import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CHAMPIONS_LOAD_REQUEST, WILDCARDS_LOAD_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import * as client from '../../client';
import Cell from './Cell';
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
    shouldDisplayRole(fillRole) {
        const { filters } = this.state;
        return filters.role ? filters.role.toLowerCase() === fillRole.role.toLowerCase() : true;
    }
    render() {
        const { loadingChampions, loadingWildcards, champions, wildcards, selectChampion } = this.props;
        const { filters, roles } = this.state;
        const loopChampion = champions.map((champion, index) => {
            const count = index + 1;
            const championAvatar = champion.image ? client.CHAMPION_AVATAR + champion.image.full : null;
            const displayClass = this.shouldDisplay(champion) ? 'd-flex' : 'd-none';
            return (
                <li
                    key={`champion-${champion.id}`}
                    id={`champion-${champion.id}`}
                    className={`champion champion-${count} col justify-content-center ${displayClass}`}
                >
                    <div className="champion-profile d-flex flex-column align-items-center" onClick={() => selectChampion(champion)}>
                        <Cell>
                            <img className="champion-avatar exact-center" src={championAvatar} alt={champion.name} />
                        </Cell>
                        <span className="champion-name">{champion.name}</span>
                    </div>
                </li>
            );
        });
        const loopWildcard = wildcards.map((wildcard, index) => {
            const count = index + 1;
            const wildcardAvatar = wildcard.role.toLowerCase();
            const displayClass = this.shouldDisplayRole(wildcard) ? 'd-flex' : 'd-none';
            return (
                <li
                    key={`wildcard-${wildcard.role}`}
                    id={`wildcard-${wildcard.role}`}
                    className={`wildcard wildcard-${count} col justify-content-center ${displayClass}`}
                >
                    <div className="wildcard-profile d-flex flex-column align-items-center" onClick={() => selectChampion(wildcard)}>
                        <Cell>
                            <img className="wildcard-avatar exact-center" src={wildcardAvatar} alt={wildcard.name} />
                        </Cell>
                        <span className="wildcard-name">{wildcard.name}</span>
                    </div>
                </li>
            );
        });
        return (
            <Fragment>
                <ChampionFilter roles={roles} filters={filters} filterRole={this.filterRole} filterName={this.filterName} />
                <div className="champion-grid">
                    <ul className="champion-list row">
                        {loadingChampions ? <Loader label="Loading champions" /> : loopChampion}
                        {loadingWildcards ? <Loader label="Loading wildcards" /> : loopWildcard}
                    </ul>
                </div>
            </Fragment>
        );
    }
}

Champion.propTypes = {
    loadingChampions: PropTypes.bool.isRequired,
    loadingWildcards: PropTypes.bool.isRequired,
    champions: PropTypes.arrayOf(PropTypes.object).isRequired,
    wildcards: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectChampion: PropTypes.func.isRequired,
};

function mapStateToProps({ calls, champions, wildcards }) {
    return {
        loadingChampions: findByString(calls, removeStatus(CHAMPIONS_LOAD_REQUEST)),
        loadingWildcards: findByString(calls, removeStatus(WILDCARDS_LOAD_REQUEST)),
        champions,
        wildcards,
    };
}

export default connect(mapStateToProps)(Champion);
