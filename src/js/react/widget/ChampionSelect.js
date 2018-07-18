import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CHAMPIONS_LOAD_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import Loader from '../unit/Loader';
import TeamComposition from './TeamComposition';
import ChampionPicker from './ChampionPicker';
import FormTeamComp from '../form/FormTeamComp';
import InputText from '../input/InputText';

class ChampionSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChampion: {},
            selectedLaneIdx: 0,
            //this is object for tracking champs pick for what lanes.
            //e.g. {annie: 0, aatrox: 1}
            champsPicked: {},
            lanes: [
                { position: 'top', champion: {} },
                { position: 'jungle', champion: {} },
                { position: 'middle', champion: {} },
                { position: 'bottom', champion: {} },
                { position: 'support', champion: {} },
            ],
            filters: {
                name: '',
                role: '',
            },
            roles: ['Tank', 'Mage', 'Assassin', 'Fighter', 'Marksman', 'Support'],
            form: {
                title: 'hello',
                description: 'world',
            },
        };
        this.selectChampion = this.selectChampion.bind(this);
        this.selectLane = this.selectLane.bind(this);
        this.filterRole = this.filterRole.bind(this);
        this.onFiltersChange = this.onFiltersChange.bind(this);
        this.metaDataFormHandler = this.metaDataFormHandler.bind(this);
    }

    selectChampion(selectedChampion) {
        let { lanes, selectedLaneIdx, champsPicked } = this.state;
        //put champ in current lane index
        lanes[selectedLaneIdx].champion = selectedChampion;
        //if champ is picked before, remove it from the other lane.
        if (champsPicked.hasOwnProperty(selectedChampion.name)) {
            let curChampIdx = champsPicked[selectedChampion.name];
            lanes[curChampIdx].champion = {};
        }
        //add champ to champs picked
        champsPicked[selectedChampion.name] = selectedLaneIdx;
        //increase lane index
        selectedLaneIdx = Math.min(lanes.length - 1, selectedLaneIdx + 1);
        //set the state
        this.setState({
            selectedChampion,
            selectedLaneIdx,
            champsPicked,
            lanes,
        });
    }

    selectLane(selectedLaneIdx) {
        this.setState({
            selectedLaneIdx,
        });
    }

    //for filtering role.
    filterRole(role) {
        //capitalize the filter for now since that's how it is saved.
        const newRole = this.state.filters.role === role ? '' : role;
        const filters = {
            ...this.state.filters,
            role: newRole,
        };
        this.setState({
            filters,
        });
    }

    metaDataFormHandler(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        const group = target.dataset.group;
        const form = group
            ? {
                  ...this.state.form,
                  [group]: {
                      ...this.state.form[group],
                      [field]: value,
                  },
              }
            : {
                  ...this.state.form,
                  [field]: value,
              };
        this.setState({
            form,
        });
    }

    //for filtering name.
    onFiltersChange(event) {
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

    render() {
        const { loadingChampions, champions } = this.props;
        const item = 'champion';
        const { lanes, selectedLaneIdx, selectedChampion, filters, roles } = this.state;
        const size = 'sm';

        const shouldDisplay = (champ) => {
            //first filter by role
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
            //basically show the <li> if filtering matches
            const displayClass = shouldDisplay(champion) ? 'd-flex' : 'd-none';
            return (
                <li key={champion.id} id={champion.id} className={`${item} ${item}-${count} col ${displayClass} justify-content-center`}>
                    <div className="champion-profile d-flex flex-column align-items-center" onClick={() => this.selectChampion(champion)}>
                        <div className="champion-image" style={style} />
                        <h3 className="champion-name">{champion.name}</h3>
                    </div>
                </li>
            );
        });

        return (
            <div className="row">
                <div className="col-3">
                    <ChampionPicker
                        lanes={lanes}
                        selectLane={this.selectLane}
                        selectedLaneIdx={selectedLaneIdx}
                        selectedChampion={selectedChampion}
                    />
                </div>

                <div className="col-6">
                    <div className="container filters-bar">
                        <div className="row">
                            <div className="col-6">
                                {roles.map((role) => {
                                    const selectedClass = filters.role === role ? 'selected' : '';
                                    return (
                                        <div
                                            key={role}
                                            className={`role-icon bg-${role.toLowerCase()}-icon ${selectedClass}`}
                                            onClick={() => this.filterRole(role)}
                                        />
                                    );
                                })}
                            </div>
                            <div className="col-6">
                                <InputText
                                    name="title"
                                    label="Champion Name"
                                    placeholder="Champion Name"
                                    onChange={this.onFiltersChange}
                                    value={filters.name}
                                    size={size}
                                />
                            </div>
                        </div>
                    </div>
                    {loadingChampions ? (
                        <Loader label="Loading champions" />
                    ) : (
                        <ul className="champion-grid row gutter-30 text-center">{loopChampion}</ul>
                    )}
                    <section className="form-section">
                        <FormTeamComp onTextChange={this.metaDataFormHandler} formData={this.state.form} />
                    </section>
                </div>

                <div className="col-3">Champion info here!</div>
            </div>
        );
    }
}

ChampionSelect.propTypes = {
    loadingChampions: PropTypes.bool.isRequired,
    champions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps({ calls, champions }) {
    return {
        loadingChampions: findByString(calls, removeStatus(CHAMPIONS_LOAD_REQUEST)),
        champions,
    };
}

export default connect(mapStateToProps)(ChampionSelect);
