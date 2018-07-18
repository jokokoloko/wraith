import React, { Component } from 'react';

const ChampionPicker = ({ lanes, selectLane, selectedLaneIdx, selectedChampion }) => {
    const loopLanes = lanes.map((lane, index) => {
        const champion = lane.champion;
        const position = lane.position;

        const highlightStyle = index === selectedLaneIdx ? 'highlight' : '';
        const imgUrl = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/${champion.key}.png`;
        return (
            <li
                className={`champion-selection d-flex align-items-center ${highlightStyle}`}
                onClick={() => selectLane(index)}
                key={champion.key || `rip-${position}`}
                id={champion.id || `rip-${position}`}
            >
                {champion.key ? <img src={imgUrl} className="champion-image bg-dark" /> : <div className="champion-image bg-dark" />}
                <span className="champion-lane">{position}:</span>
                <span className="champion-name">{champion.name}</span>
            </li>
        );
    });

    return (
        <div className="team-selection border border-primary bg-light">
            <ul className="team-composition row">{loopLanes}</ul>
        </div>
    );
};

export default ChampionPicker;
