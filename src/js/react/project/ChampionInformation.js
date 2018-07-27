import React from 'react';
import PropTypes from 'prop-types';

const ChampionInformation = ({ champion }) => <h1 className="p-xs-15">{champion.name || 'Select a champion.'}</h1>;

ChampionInformation.propTypes = {
    champion: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChampionInformation;
