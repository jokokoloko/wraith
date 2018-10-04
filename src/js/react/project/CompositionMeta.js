import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from '../input/InputText';
import { positions } from '../../composition';

class CompositionMeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curPosition: 'top',
        };
        this.selectPosition = this.selectPosition.bind(this);
    }
    selectPosition(position) {
        this.setState({
            curPosition: position,
        });
    }
    render() {
        const { form, onChange, formNotes, formStrategies, addStrategy } = this.props;
        let { curPosition } = this.state;
        const size = 'lg';
        const buttonGroup = positions.map((pos, idx) => {
            return (
                <button key={`btn-${idx}`} type="button" className="btn btn-hollow" onClick={() => this.selectPosition(pos)}>
                    {pos}
                </button>
            );
        });
        const strategyInputs = Object.keys(formStrategies).map((key, idx) => {
            return (
                <div key={`strategy-${key}`} className="strategy-group">
                    <InputText
                        name="phase"
                        label="phase"
                        placeholder="Phase"
                        group={key}
                        size={size}
                        onChange={(e) => onChange(e, 'formStrategies')}
                        value={formStrategies[key].phase}
                    />
                    <InputText
                        type="area"
                        name="strategy"
                        label="strategy"
                        placeholder="Strategy"
                        group={key}
                        size={size}
                        onChange={(e) => onChange(e, 'formStrategies')}
                        value={formStrategies[key].strategy}
                    />
                </div>
            );
        });
        return (
            <form id="form-composition" className={`form form-${size}`}>
                <div className="panel">
                    <InputText
                        name="title"
                        label="Title"
                        placeholder="Title"
                        size={size}
                        onChange={(e) => onChange(e, 'form')}
                        value={form.title}
                        tip={true}
                    />
                    <InputText
                        type="area"
                        name="description"
                        label="Description"
                        placeholder="Description"
                        size={size}
                        onChange={(e) => onChange(e, 'form')}
                        value={form.description}
                        tip={true}
                    />
                </div>
                <div className="panel">
                    <h4 className="section-title">Notes</h4>
                    <div className="form-action">{buttonGroup}</div>
                    <InputText
                        type="area"
                        name="pick"
                        label="pick"
                        placeholder="Pick"
                        group={curPosition}
                        size={size}
                        onChange={(e) => onChange(e, 'formNotes')}
                        value={formNotes[curPosition].pick}
                    />
                    <InputText
                        type="area"
                        name="ban"
                        label="ban"
                        placeholder="Ban"
                        group={curPosition}
                        size={size}
                        onChange={(e) => onChange(e, 'formNotes')}
                        value={formNotes[curPosition].ban}
                    />
                </div>
                <div className="panel">
                    <h4 className="section-title">Strategies</h4>
                    {strategyInputs}
                    <div className="strategy-action text-right">
                        <button type="button" className="btn btn-hollow btn-add-group" onClick={addStrategy}>
                            + Phase
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

CompositionMeta.propTypes = {
    form: PropTypes.objectOf(PropTypes.any).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CompositionMeta;
