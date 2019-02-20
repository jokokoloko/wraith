import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiView from '../../api/apiView';
import * as client from '../client';
import { COMPOSITIONS } from '../data';
import { paragraphify, arrayToObject } from '../function';
import { buildLanes } from '../utilities';
import Basic from './section/Basic';
import Affix from './unit/Affix';
import Image from './unit/Image';
import Loader from './unit/Loader';
import IconLane from './project/IconLane';
import LoopChampion from './project/LoopChampion';
import LoopNote from './project/LoopNote';

class CompositionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingView: true,
            view: {},
        };
    }
    componentDidMount() {
        this.loadView();
    }
    componentDidUpdate(prevProps) {
        const { match } = this.props;
        match.params.id !== prevProps.match.params.id &&
            this.setState(
                {
                    loadingView: true,
                },
                this.loadView(),
            );
    }
    loadView() {
        const { match } = this.props;
        apiView.viewLoad(match.params.id, COMPOSITIONS).then((view) =>
            this.setState({
                loadingView: false,
                view,
            }),
        );
    }
    render() {
        const { championsMap, wildcardsMap } = this.props;
        const { view: composition, loadingView } = this.state;
        const picks = buildLanes(composition.pick, championsMap, wildcardsMap);
        const bans = buildLanes(composition.ban, championsMap, wildcardsMap);
        const meta = composition.meta;
        const notes = composition.note;
        const strategies = composition.strategies || [];
        const loopPick = picks.map((pick, index) => {
            const count = index + 1;
            const { champion, position } = pick;
            const championLoading = champion.key ? client.CHAMPION_LOADING + champion.key + '_0.jpg' : null;
            return (
                <li key={`pick-${position}`} id={`pick-${position}`} className={`pick pick-${count} champion-${champion ? champion.id : 'none'} col`}>
                    <div className="champion-loading">
                        <Image source={championLoading} alternate={champion.name} />
                        <div className="champion-overlay d-flex flex-column align-items-center justify-content-center">
                            <IconLane position={position} />
                            <h2 className="champion-name">{champion.name}</h2>
                        </div>
                    </div>
                </li>
            );
        });
        const loopStrategy = strategies.map((item, index) => {
            const count = index + 1;
            const { phase, strategy } = item;
            return (
                strategy && (
                    <article key={`strategies-${count}`} id={`strategies-${count}`} className={`strategies strategies-${count} node-xs-50`}>
                        <header className="node-xs-30">
                            <h4 className="strategies-phase">{phase}</h4>
                        </header>
                        <section className="node-xs-30">{paragraphify(strategy)}</section>
                    </article>
                )
            );
        });
        return loadingView ? (
            <Loader position="exact-center fixed" label="Loading view" />
        ) : (
            <main id="main" className="composition-view" role="main">
                <div className="container-fluid">
                    {composition ? (
                        <Fragment>
                            <Basic space="space-xs-50">
                                <ul className="composition-picks row text-center">{loopPick}</ul>
                            </Basic>
                            <Basic space="space-xs-50">
                                <div className="row gutter-80">
                                    <div className="col-auto">
                                        <Affix offset={547}>Actions</Affix>
                                    </div>
                                    <div className="col">
                                        {meta && (meta.title || meta.description) && (
                                            <header className="composition-meta node-xs-80">
                                                {meta.title && <h1 className="title">{meta.title}</h1>}
                                                {meta.description && paragraphify(meta.description)}
                                            </header>
                                        )}
                                        {notes && (
                                            <section className="composition-notes composition-notes-picks node-xs-80">
                                                <header className="d-flex align-items-center justify-content-between node-xs-50">
                                                    <h3 className="section-title">Picks</h3>
                                                    <ul className="champion-list composition-picks list-reset d-flex justify-content-between">
                                                        <LoopChampion collection={picks} />
                                                    </ul>
                                                </header>
                                                <section className="node-xs-50">
                                                    <LoopNote type="pick" collection={picks} notes={notes} />
                                                </section>
                                            </section>
                                        )}
                                        {notes && (
                                            <section className="composition-notes composition-notes-bans node-xs-80">
                                                <header className="d-flex align-items-center justify-content-between node-xs-50">
                                                    <h3 className="section-title">Bans</h3>
                                                    <ul className="champion-list composition-bans list-reset d-flex justify-content-between">
                                                        <LoopChampion collection={bans} />
                                                    </ul>
                                                </header>
                                                <section className="node-xs-50">
                                                    <LoopNote type="ban" collection={bans} notes={notes} />
                                                </section>
                                            </section>
                                        )}
                                        {strategies.length > 0 && (
                                            <section className="composition-strategies node-xs-80">
                                                <header className="node-xs-50">
                                                    <h3 className="section-title">Strategies</h3>
                                                </header>
                                                <section className="node-xs-50">{loopStrategy}</section>
                                            </section>
                                        )}
                                    </div>
                                    <div className="col-auto">
                                        <div className="extra">Extra</div>
                                    </div>
                                </div>
                            </Basic>
                        </Fragment>
                    ) : (
                        <Basic space="space-xs-50">
                            <header className="empty text-center">
                                <h1>404 - Composition</h1>
                            </header>
                        </Basic>
                    )}
                </div>
            </main>
        );
    }
}

CompositionView.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    wildcardsMap: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps({ champions, wildcards }) {
    const championsMap = arrayToObject(champions, 'id');
    const wildcardsMap = arrayToObject(wildcards, 'id');
    return {
        championsMap,
        wildcardsMap,
    };
}

export default connect(mapStateToProps)(CompositionView);
