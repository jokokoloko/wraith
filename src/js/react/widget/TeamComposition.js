import React, { Component } from 'react';

class TeamComposition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lanes: props.lanes,
			selectedLane: props.selectedLane,
			selectedChampion: props.selectedChampion,
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { selectedLane } = this.props;

		if (selectedLane != prevState.selectedLane) {
			this.setState({
				selectedLane,
			})
		}
	}

	render() {
		const lanes = this.state.lanes;
        const loopLanes = lanes.map((lane, index) => {
        	const champion = lane.champion;
        	const position = lane.position;

        	const highlight = lane.position == this.state.selectedLane;
        	if (champion.key === undefined) {
        		return (
        			<li onClick={this.props.selectLane.bind(this, position)} 
        				key={`rip-${position}`} 
        				className={`champion-selection d-flex align-items-center ${highlight ? "highlight" : ""}`}>
        				{`Empty ${position} lane`}
    				</li>
        		);
        	} else {
        		const imgUrl = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/${champion.key}.png`;
        		return (
	                <li onClick={this.props.selectLane.bind(this, position)} 
	                	key={champion.id} 
	                	id={champion.id} 
	                	className={`champion-selection d-flex align-items-center ${highlight ? "highlight" : ""}`}>
                        <img src={imgUrl} className="champion-image" />
                        <span className="champion-lane">{position}:</span>
                        <span className="champion-name">{champion.name}</span>
	                </li>
	            );
        	}
        }, this);

        const { selectedLane } = this.state;
        return (
        	<div className="team-selection">
	        	<h3>Team Composition</h3>
	        	<h4>{`You are selecting for ${selectedLane} lane.`}</h4>
	        	<ul className="team-composition">{loopLanes}</ul>
        	</div>
    	);
	}
}

export default TeamComposition;