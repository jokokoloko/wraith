import React from 'react';
import PropTypes from 'prop-types';
import * as client from '../../client';
import Welcome from './Welcome';
import Image from '../unit/Image';
import rift from '../../../img/summoners-rift.jpg';

const ChampionInformation = ({ champion }) => {
    let champImg,
        roles = '';
    if (champion && champion.name) {
        champImg = client.CHAMPION_SPLASH + champion.key + '_0.jpg';
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
        <Welcome
            title="Welcome to Invade Blue"
            description="Here you can build team compositons and share them for all to see or only with your friends."
            image={rift}
        />
    );
};

ChampionInformation.propTypes = {
    champion: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChampionInformation;
