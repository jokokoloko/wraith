import React from 'react';
import PropTypes from 'prop-types';
import * as client from '../../client';
import Cell from './Cell';
import Image from '../unit/Image';
import rift from '../../../img/summoners-rift.jpg';

const ChampionInformation = ({ champion }) => {
    let champImg,
        roles = '';
    if (champion.id && champion.type !== 'wildcard') {
        champImg = client.CHAMPION_SPLASH + champion.key + '_0.jpg';
        Object.keys(champion.tags).forEach((tag) => {
            roles += tag + ', ';
        });
        // remove the extra comma.
        roles = roles.substring(0, roles.length - 2);
    }
    return champion.id && champion.type !== 'wildcard' ? (
        <div className="information information-champion">
            <Cell>
                <Image source={champImg} alternate={champion.name} />
            </Cell>
            <h1 className="title">{champion.name}</h1>
            <h2 className="description">{champion.title}</h2>
            <p className="tag d-none">{roles}</p>
        </div>
    ) : (
        <div className="information information-welcome">
            <Cell>
                <Image source={rift} alternate="Welcome to Invade Blue" />
            </Cell>
            <h1 className="title">Welcome to Invade Blue</h1>
            <h2 className="description">Here you can build team compositons and share them for all to see or only with your friends.</h2>
        </div>
    );
};

ChampionInformation.propTypes = {
    champion: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChampionInformation;
