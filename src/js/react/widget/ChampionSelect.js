import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CHAMPIONS_LOAD_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import Loader from '../unit/Loader';
import TeamComposition from './TeamComposition';

class ChampionSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
        };
        this.selectChampion = this.selectChampion.bind(this);
    }
    selectChampion(selected) {
        this.setState({
            selected,
        });
    }
    render() {
        const { loadingChampions, champions } = this.props;
        const item = 'champion';
        const loopChampion = champions.map((champion, index) => {
            const count = index + 1;
            const sprite = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/${champion.image.sprite}`;
            const style = {
                backgroundImage: `url('${sprite}')`,
                backgroundPosition: `-${champion.image.x}px -${champion.image.y}px`,
            };
            return (
                <li key={champion.id} id={champion.id} className={`${item} ${item}-${count} col d-flex justify-content-center`}>
                    <div className="champion-profile d-flex flex-column align-items-center" onClick={() => this.selectChampion(champion)}>
                        <div className="champion-image" style={style} />
                        <h3 className="champion-name">{champion.name}</h3>
                    </div>
                </li>
            );
        });
        const { selected } = this.state;
        return (
            <div className="row">
                <div className="col-4">
                    <TeamComposition selectedChampion={selected} ></TeamComposition>
                </div>

                <div className="col-8">
                    {loadingChampions ? (
                        <Loader label="Loading champions" />
                    ) : (
                        <ul className="champion-grid row gutter-30 text-center">{loopChampion}</ul>
                    )}
                </div>
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
