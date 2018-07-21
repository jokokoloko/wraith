import React, { Component } from 'react';

const ChampionGrid = ({ champions, selectChampion, filters }) => {
    const item = 'champion';

    const shouldDisplay = (champ) => {
        //first filter by role
        let roleMatch = true;
        if (filters.role) {
            roleMatch = champ.tags[filters.role];
        }
        return roleMatch && champ.name.toLowerCase().indexOf(filters.name.toLowerCase()) >= 0;
    };

    const loopChampion = champions.map((champion, index) => {
        const count = index + 1;
        const sprite = `https://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/${champion.image.sprite}`;
        const style = {
            backgroundImage: `url('${sprite}')`,
            backgroundPosition: `-${champion.image.x}px -${champion.image.y}px`,
        };
        //basically show the <li> if filtering matches
        const displayClass = shouldDisplay(champion) ? 'd-flex' : 'd-none';
        return (
            <li key={champion.id} id={champion.id} className={`${item} ${item}-${count} col ${displayClass} justify-content-center`}>
                <div className="champion-profile d-flex flex-column align-items-center" onClick={() => selectChampion(champion)}>
                    <div className="champion-image" style={style} />
                    <h3 className="champion-name">{champion.name}</h3>
                </div>
            </li>
        );
    });

    return <ul className="champion-grid row gutter-30 text-center">{loopChampion}</ul>;
};

export default ChampionGrid;
