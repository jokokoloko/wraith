import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CHAMPIONS_LOAD_REQUEST } from "../../redux/type";
import { findByString, removeStatus } from "../../filter";
import Loader from "../unit/Loader";
import TeamComposition from "./TeamComposition";
import FormTeamComp from "../form/FormTeamComp";
import InputText from '../input/InputText';

class ChampionSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChampion: {},
            selectedLane: "top",
            teamComposition: {
                id: "",
                user: "",
                top: {},
                jungle: {},
                middle: {},
                bottom: {},
                support: {},
                title: "",
                description: "",
            },
            lanes: [
                { key: 0, position: "top", champion: {} },
                { key: 1, position: "jungle", champion: {} },
                { key: 2, position: "middle", champion: {} },
                { key: 3, position: "bottom", champion: {} },
                { key: 4, position: "support", champion: {} },
            ],
            filters: {
                name: ''
            }
        };
        this.selectChampion = this.selectChampion.bind(this);
        this.selectLane = this.selectLane.bind(this);
        this.onFiltersChange = this.onFiltersChange.bind(this);
    }
    selectChampion(selectedChampion) {
        let newState = {
            selectedChampion,
        };

        let selectedLane = this.state.selectedLane;
        if (selectedChampion && selectedLane) {
            let lane = this.state.lanes.find((lane) => {
                return lane.position == selectedLane;
            });

            let newLanes = this.state.lanes.slice(0);
            newLanes[lane.key]["champion"] = selectedChampion;
            newState["lanes"] = newLanes;
        }

        this.setState(newState);
    }
    selectLane(selectedLane) {
        this.setState({
            selectedLane,
        });
    }

    onFiltersChange(event) {
        const target = event.target;
        const value = target.value;
        const filters = {
            ...this.state.filters,
            name: value
        }
        this.setState({
            filters,
        });

    }
    render() {
        const { loadingChampions, champions } = this.props;
        const item = "champion";
        const { lanes, selectedLane, selectedChampion, filters } = this.state;
        const size = 'sm';

        const loopChampion = champions.map((champion, index) => {
            const count = index + 1;
            const sprite = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/${champion.image.sprite}`;
            const style = {
                backgroundImage: `url('${sprite}')`,
                backgroundPosition: `-${champion.image.x}px -${champion.image.y}px`,
            };
            //basically hide the li if spelling matches
            const displayClass = champion.name.toLowerCase().indexOf(filters.name.toLowerCase()) >= 0 ?
                                    'd-flex' :
                                    'd-none';
            return (
                <li key={champion.id} id={champion.id}
                    className={`${item} ${item}-${count} col ${displayClass} justify-content-center`}>
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
                    <TeamComposition
                        lanes={lanes}
                        selectLane={this.selectLane}
                        selectedLane={selectedLane}
                        selectedChampion={selectedChampion}
                    />
                </div>

                <div className="col-6">
                    <div className="container filters-bar">
                        <div className="row">
                            <div className="col-6">
                                <div className="role-icon bg-tank-icon"></div>
                                <div className="role-icon bg-mage-icon"></div>
                                <div className="role-icon bg-assasin-icon"></div>
                                <div className="role-icon bg-fighter-icon"></div>
                                <div className="role-icon bg-marksman-icon"></div>
                                <div className="role-icon bg-support-icon"></div>
                            </div>
                            <div className="col-6">
                                <InputText name="title"
                                    label="Champion Name"
                                    placeholder="Champion Name"
                                    onChange={this.onFiltersChange}
                                    value={filters.name}
                                    size={size} />
                            </div>
                        </div>
                    </div>
                    {loadingChampions ? (
                        <Loader label="Loading champions" />
                    ) : (
                        <ul className="champion-grid row gutter-30 text-center">{loopChampion}</ul>
                    )}
                    <section className="form-section">
                        <FormTeamComp />
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
