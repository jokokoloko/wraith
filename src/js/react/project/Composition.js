import React, { Component } from 'react';
import apiComposition from '../../../api/apiComposition';
import { slugify, excerptify } from '../../function';
import CompositionMeta from './CompositionMeta';
import CompositionSelector from './CompositionSelector';
import Champion from './Champion';
import ChampionInformation from './ChampionInformation';

class Composition extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const { lanes, form } = this.state;
        const slug = slugify(form.title);
        const excerpt = excerptify(form.description, 210);
        const data = {
            ...form,
            lane: {
                top: lanes[0].champion.id || null,
                jungle: lanes[1].champion.id || null,
                middle: lanes[2].champion.id || null,
                bottom: lanes[3].champion.id || null,
                support: lanes[4].champion.id || null,
            },
            slug,
            excerpt,
        };
        apiComposition.compositionAdd(data);
    }
    render() {
        const { selectedLaneIdx, selectedChampion, lanes, form } = this.state;
        return (
            <div className="row gutter-50 gutter-80">
                <div className="col-3">
                    <CompositionSelector selectedLaneIdx={selectedLaneIdx} lanes={lanes} selectLane={this.selectLane} onSubmit={this.onSubmit} />
                </div>
                <div className="col-6">
                    <Champion selectChampion={this.selectChampion} />
                    <CompositionMeta form={form} onChange={this.onChange} />
                </div>
                <div className="col-3">
                    <ChampionInformation champion={selectedChampion} />
                </div>
            </div>
        );
    }
}

export default Composition;
