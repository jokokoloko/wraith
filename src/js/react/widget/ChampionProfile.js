import React, { Component } from 'react';
import PropTypes from 'prop-types';

// const ChampionProfile = ({ champion }) => {
class ChampionProfile extends Component {
	constructor(props) {
		super(props);
		this.champion = props.champion;
		this.imgUrl = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/${this.champion.image.sprite}`;
        this.style = {
			height: '48px',
			width: '48px',
			zoom: '120%',
			backgroundImage: `url('${this.imgUrl}')`,
			backgroundPosition: `-${this.champion.image.x}px -${this.champion.image.y}px`
		};
		this.selectChampion = this.selectChampion.bind(this);
    }

	// const imgUrl = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/${champion.image.sprite}`;
	// let style = {
	// 	height: '48px',
	// 	width: '48px',
	// 	zoom: '120%',
	// 	backgroundImage: `url('${imgUrl}')`,
	// 	backgroundPosition: `-${champion.image.x}px -${champion.image.y}px`
	// };

	selectChampion() {
		alert(`you selected ${this.champion.name}`);
	}

	render() {
		return <div onClick={this.selectChampion} style={this.style}></div>
		// return <div style={style}></div>
	}
};

ChampionProfile.propTypes = {
	champion: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};

export default ChampionProfile;