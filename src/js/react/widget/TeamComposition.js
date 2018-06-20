import React, { Component } from 'react';

class TeamComposition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			user: "",
			top: null,
			jungle: null,
			middle: null,
			bottom: null,
			support: null,
			title: "",
			description: "",
			lanes: ["top", "jungle", "middle", "bottom", "support"],
		}
		// TODO: change lanes to start as {}
		this.isEmpty = this.isEmpty.bind(this);
		this.addChampion = this.addChampion.bind(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { selectedChampion } = this.props;
		if (selectedChampion == prevProps.selectedChampion) return;

		let firstEmpty = this.state.lanes.find(this.isEmpty);

		if (firstEmpty) this.addChampion(selectedChampion, firstEmpty);
	}

	// TODO: add it to filter.js
	isEmpty(lane) {
		return this.state[lane] === null;
	}

	addChampion(champion, lane) {
		this.setState({
        	[lane]: champion,
    	});
	}

	render() {
		const lanes = this.state["lanes"];
        const loopLanes = lanes.map((lane, index) => {
        	if (this.state[lane] === null) {
        		return (
        			<li key={`rip ${lane}`}>{`no champion selected for ${lane} lane`}</li>
        		);
        	} else {
        		const champion = this.state[lane];
        		const count = index + 1;
	            const sprite = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/${champion.image.sprite}`;
	            const style = {
	                backgroundImage: `url('${sprite}')`,
	                backgroundPosition: `-${champion.image.x}px -${champion.image.y}px`,
	            };
        		return (
	                <li key={champion.id} id={champion.id} className={`${count} d-flex justify-content-left`}>
	                    <div className="champion-selection d-flex align-items-center">
	                        <span className="champion-image" style={style} />
	                        <span className="champion-lane">{lane.toUpperCase()}: </span>
	                        <span className="champion-name">{champion.name}</span>
	                    </div>
	                </li>
	            );
        	}
        });

        return <ul className="">{loopLanes}</ul>;
	}
}

export default TeamComposition;