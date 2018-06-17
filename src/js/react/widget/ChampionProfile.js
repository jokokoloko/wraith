import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionComposition from '../../redux/action/actionComposition';

class ChampionProfile extends Component {
	constructor(props) {
		super(props);
		this.selectChampion = this.selectChampion.bind(this);
	}

	selectChampion() {
		const { champion, actionComposition } = this.props;
		actionComposition.compositionBuild(champion);
	}

	render() {
		const { champion } = this.props;
		const imgUrl = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/${champion.image.sprite}`;
		let style = {
			backgroundImage: `url('${imgUrl}')`,
			backgroundPosition: `-${champion.image.x}px -${champion.image.y}px`
		};

		return (
			<div className="champion-profile" style={style} onClick={this.selectChampion}></div>
		)
	}
};

ChampionProfile.propTypes = {
	champion: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actionComposition: bindActionCreators(actionComposition, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(ChampionProfile);