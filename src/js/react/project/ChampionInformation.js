import React from 'react';
import PropTypes from 'prop-types';
import * as client from '../../client';
import Image from '../unit/Image';

const ChampionInformation = ({ champion }) => {
    let champImg,
        roles = '';
    if (champion && champion.name) {
        console.log('my champ', champion);
        champImg = client.CHAMPION_LOADING + champion.key + '_0.jpg';
        Object.keys(champion.tags).forEach((tag) => {
            roles += tag + ', ';
        });
        //remove the extra comma.
        roles = roles.substring(0, roles.length - 2);
    }
    return champion && champion.name ? (
        <div className="champion-info">
            <div className="img-container">
                <Image source={champImg} alternate={champion.name} />
            </div>
            <h1 className="p-xs-15">{champion.name}</h1>
            <h2 className="p-xs-15">{champion.title}</h2>
            <h4 className="p-xs-15">Roles: {roles}</h4>
        </div>
    ) : (
        <h1 className="p-xs-15">Select a Champion.</h1>
    );
};

ChampionInformation.propTypes = {
    champion: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChampionInformation;
