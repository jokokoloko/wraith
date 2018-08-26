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
                <button key={`btn-${idx}`} type="button" className="btn btn-info" onClick={() => this.selectPosition(pos)}>
                    {pos}
                </button>
            );
        });
        const strategyInputs = Object.keys(formStrategies).map((key, idx) => {
            return (
                <div key={`strategy-${key}`} className="mt-3">
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
        })
        return (
            <form id="form-composition" className={`form form-${size}`}>
                <div className="panel mt-5">
                    <InputText name="title" label="Title" placeholder="Title" size={size} onChange={(e) => onChange(e, 'form')} value={form.title} />
                    <InputText
                        type="area"
                        name="description"
                        label="Description"
                        placeholder="Description"
                        size={size}
                        onChange={(e) => onChange(e, 'form')}
                        value={form.description}
                    />
                </div>

                <div className="panel mt-5">
                    {buttonGroup}

                    <InputText
                        type="area"
                        name="notes"
                        label="notes"
                        placeholder="Notes"
                        group={curPosition}
                        size={size}
                        onChange={(e) => onChange(e, 'formNotes')}
                        value={formNotes[curPosition].notes}
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

                <div className="panel mt-5">
                    {strategyInputs}
                    <button type="button" className="btn btn-info" onClick={addStrategy}>
                        + Strategy
                    </button>
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
