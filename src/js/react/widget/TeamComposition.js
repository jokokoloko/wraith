import React, { Component } from "react";

class TeamComposition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lanes: props.lanes,
            selectedLane: props.selectedLane,
            selectedChampion: props.selectedChampion,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { selectedLane } = this.props;

        if (selectedLane != prevState.selectedLane) {
            this.setState({
                selectedLane,
            });
        }
    }

    render() {
        const { lanes, selectedLane, selectedChampion } = this.state;
        const loopLanes = lanes.map((lane, index) => {
            const champion = lane.champion;
            const position = lane.position;

            const highlight = lane.position == this.state.selectedLane;
            const imgUrl = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/${champion.key}.png`;
            return (
                <li
                    className={`champion-selection d-flex align-items-center ${highlight ? "highlight" : ""}`}
                    onClick={this.props.selectLane.bind(this, position)}
                    key={champion.id || `rip-${position}`}
                    id={champion.id || `rip-${position}`}
                >
                    {champion.key
						? 	<img src={imgUrl} className="champion-image bg-dark" />
						: 	<div className="champion-image bg-dark" />}
                    <span className="champion-lane">{position}:</span>
                    <span className="champion-name">{champion.name}</span>
                </li>
            );
        }, this);

        return (
            <div className="team-selection border border-primary bg-light">
                <ul className="team-composition row">{loopLanes}</ul>
            </div>
        );
    }
}

export default TeamComposition;
