import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CHAMPIONS_LOAD_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import ChampionLane from './ChampionLane';
import ChampionGrid from './ChampionGrid';

class ChampionSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            composition: {
                id: "",
                user: "",
                top: null,
                jungle: null,
                middle: null,
                bottom: null,
                support: null,
                title: "",
                description: "",
            }
        };
    }

    render() {
        const { champions } = this.props;
        return (
            <div className="row">
                <div className="col-4">
                    <ChampionLane></ChampionLane>
                </div>
                <div className="col-8">
                    <ChampionGrid champions={champions}></ChampionGrid>
                </div>
            </div>
        );
    }
};

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
