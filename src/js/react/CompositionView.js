import React, { Component } from 'react';

class CompositionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamComposition: {
                id: '',
                user: '',
                top: {
                    image: {
                        full: 'Annie.png',
                        group: 'champion',
                    },
                    name: 'Annie',
                    key: 'Annie',
                    id: 1,
                },
                jungle: {
                    image: {
                        full: 'Kayle.png',
                        group: 'champion',
                    },
                    name: 'Kayle',
                    key: 'Kayle',
                    id: 10,
                },
                middle: {
                    image: {
                        full: 'Xerath.png',
                        group: 'champion',
                    },
                    name: 'Xerath',
                    key: 'Xerath',
                    id: 101,
                },
                bottom: {
                    image: {
                        full: 'Shyvana.png',
                        group: 'champion',
                    },
                    name: 'Shyvana',
                    key: 'Shyvana',
                    id: 102,
                },
                support: {
                    image: {
                        full: 'Ahri.png',
                        group: 'champion',
                    },
                    name: 'Ahri',
                    key: 'Ahri',
                    id: 103,
                },
                title: 'Badass Comp',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
        };
    }

    render() {
        const { top, jungle, middle, bottom, support, title, description } = this.state.teamComposition,
            laneList = [top, jungle, middle, bottom, support],
            loopLanes = laneList.map((champ, idx) => {
                const imgUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.name}_0.jpg`;
                return (
                    <div key={champ.id} className="col mx-2">
                        <img className="champion" src={imgUrl} alt={champ.name} />
                    </div>
                );
            });
        return (
            <div className="container-fluid">
                <div className="container-fluid champ-row-bg">
                    <div className="container">
                        <div className="row">{loopLanes}</div>
                    </div>
                </div>
                <div className="container">
                    <div className="row my-5">
                        <h3>{title}</h3>
                    </div>
                    <div className="row my-5">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompositionView;
