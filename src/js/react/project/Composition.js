import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionView from '../../redux/action/actionView';
import * as actionComposition from '../../redux/action/actionComposition';
import { COMPOSITION_SAVE_REQUEST } from '../../redux/type';
import { COMPOSITIONS } from '../../data';
import { findByString, removeStatus } from '../../filter';
import { slugify, excerptify, arrayToObject } from '../../function';
import * as path from '../../path';
import CompositionMeta from './CompositionMeta';
import CompositionSelector from './CompositionSelector';
import Champion from './Champion';
import ChampionInformation from './ChampionInformation';
import Loader from '../unit/Loader';

class Composition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingView: true,
            id: null,
            user: null,
            selectedLaneIdx: 0,
            selectedChampion: {},
            // this is object for tracking champs pick for what lanes.
            // e.g. { annie: 0, aatrox: 1 }
            champsPicked: {},
            lanes: [
                { position: 'top', champion: {} },
                { position: 'jungle', champion: {} },
                { position: 'middle', champion: {} },
                { position: 'bottom', champion: {} },
                { position: 'support', champion: {} },
            ],
            form: {},
        };
        this.selectLane = this.selectLane.bind(this);
        this.selectChampion = this.selectChampion.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const { history, match, actionView } = this.props;
        match.params.id
            ? actionView.viewLoad(match.params.id, COMPOSITIONS, true).then((composition) => {
                  composition.view
                      ? this.setState({
                            loadingView: false,
                        })
                      : history.push(path.Root);
              })
            : this.setState({
                  loadingView: false,
              });
    }
    componentDidUpdate(prevProps) {
        const { match, view } = this.props;
        match.params.id && view !== prevProps.view && this.setInitialStateHelper(view);
    }
    setInitialStateHelper(data) {
        const { championsMap } = this.props;
        const { lane } = data;
        const lanes = [
            { position: 'top', champion: lane.top ? championsMap[lane.top] : {} },
            { position: 'jungle', champion: lane.jungle ? championsMap[lane.jungle] : {} },
            { position: 'middle', champion: lane.middle ? championsMap[lane.middle] : {} },
            { position: 'bottom', champion: lane.bottom ? championsMap[lane.bottom] : {} },
            { position: 'support', champion: lane.support ? championsMap[lane.support] : {} },
        ];
        let champsPicked = {};
        lanes.forEach((item, idx) => {
            if (item.champion.name) {
                champsPicked[item.champion.name] = idx;
            }
        });
        this.setState({
            id: data.id,
            user: data.user,
            form: data.meta,
            champsPicked,
            lanes,
        });
    }
    selectLane(selectedLaneIdx) {
        this.setState({
            selectedLaneIdx,
        });
    }
    selectChampion(selectedChampion) {
        let { selectedLaneIdx, champsPicked, lanes } = this.state;
        // put champ in current lane index
        lanes[selectedLaneIdx].champion = selectedChampion;
        // if champ is picked before, remove it from the other lane.
        if (champsPicked.hasOwnProperty(selectedChampion.name)) {
            let curChampIdx = champsPicked[selectedChampion.name];
            lanes[curChampIdx].champion = {};
        }
        // add champ to champs picked
        champsPicked[selectedChampion.name] = selectedLaneIdx;
        // increase lane index
        selectedLaneIdx = Math.min(lanes.length - 1, selectedLaneIdx + 1);
        // set the state
        this.setState({
            selectedLaneIdx,
            selectedChampion,
            champsPicked,
            lanes,
        });
    }
    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        const group = target.dataset.group;
        const form = group
            ? {
                  ...this.state.form,
                  [group]: {
                      ...this.state.form[group],
                      [field]: value,
                  },
              }
            : {
                  ...this.state.form,
                  [field]: value,
              };
        this.setState({
            form,
        });
    }
    onSubmit() {
        const { history, authenticated, actionComposition } = this.props;
        const { id, user, lanes, form } = this.state;
        const slug = slugify(form.title);
        const excerpt = excerptify(form.description, 210);
        const data = {
            lane: {
                top: lanes[0].champion.id || null,
                jungle: lanes[1].champion.id || null,
                middle: lanes[2].champion.id || null,
                bottom: lanes[3].champion.id || null,
                support: lanes[4].champion.id || null,
            },
            meta: {
                ...form,
                excerpt,
            },
            id,
            user,
            slug,
        };
        actionComposition
            .compositionSave(data)
            .then(
                (composition) =>
                    authenticated && composition
                        ? history.push(`${path._Edit}/${composition.id}`)
                        : authenticated
                            ? null
                            : history.push(path.Register),
            );
    }
    render() {
        const { submitting, authenticated } = this.props;
        const { loadingView, id, selectedLaneIdx, selectedChampion, lanes, form } = this.state;
        return loadingView ? (
            <Loader position="exact-center fixed" label="Loading view" />
        ) : (
            <div className="row gutter-50 gutter-80">
                <div className="col-3">
                    <CompositionSelector
                        id={id}
                        selectedLaneIdx={selectedLaneIdx}
                        lanes={lanes}
                        selectLane={this.selectLane}
                        onSubmit={this.onSubmit}
                        submitting={submitting}
                    />
                </div>
                <div className="col-6">
                    <Champion selectChampion={this.selectChampion} />
                    {authenticated && <CompositionMeta form={form} onChange={this.onChange} />}
                </div>
                <div className="col-3">
                    <ChampionInformation champion={selectedChampion} />
                </div>
            </div>
        );
    }
}

Composition.propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    authenticated: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    view: PropTypes.objectOf(PropTypes.any).isRequired,
    champions: PropTypes.arrayOf(PropTypes.object).isRequired,
    championsMap: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
    actionComposition: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ view, calls, champions }) {
    const championsMap = arrayToObject(champions, 'id');
    return {
        submitting: findByString(calls, removeStatus(COMPOSITION_SAVE_REQUEST)),
        view,
        champions,
        championsMap,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionView: bindActionCreators(actionView, dispatch),
        actionComposition: bindActionCreators(actionComposition, dispatch),
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Composition),
);
