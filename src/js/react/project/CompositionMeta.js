import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import InputText from '../input/InputText';
import { positions } from '../../utilities';

class CompositionMeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 'top',
        };
        this.selectPosition = this.selectPosition.bind(this);
    }
    selectPosition(position) {
        this.setState({
            currentPosition: position,
        });
    }
    render() {
        const { form, formNotes, formStrategies, addStrategy, onChange } = this.props;
        let { currentPosition } = this.state;
        const size = 'lg';
        const buttonGroup = positions.map((position, index) => {
            const active = currentPosition === position;
            return (
                <button
                    key={`btn-${index}`}
                    type="button"
                    className={`btn btn-tab ${active ? 'active' : ''}`}
                    onClick={() => this.selectPosition(position)}
                >
                    <Cell>
                        <div className="exact-center">{position}</div>
                    </Cell>
                </button>
            );
        });
        const strategyInputs = Object.keys(formStrategies).map((key, index) => {
            return (
                <div key={`strategy-${key}`} className="form-node">
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
                <div className="form-panel">
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
                <div className="form-panel">
                    <h3 className="form-title section-title">Picks</h3>
                    <InputText
                        type="area"
                        name="note-picks-general"
                        label="General"
                        placeholder="General"
                        size={size}
                        onChange={(e) => onChange(e, 'form')} // change
                        value={form.description} // change
                    />
                    <div className="form-node">
                        <div className="form-action d-flex justify-content-between">{buttonGroup}</div>
                        <InputText
                            type="area"
                            name="pick"
                            label="pick"
                            placeholder="Note"
                            group={currentPosition}
                            size={size}
                            onChange={(e) => onChange(e, 'formNotes')}
                            value={formNotes[currentPosition].pick}
                        />
                    </div>
                </div>
                <div className="form-panel">
                    <h3 className="form-title section-title">Strategies</h3>
                    {strategyInputs}
                    <div className="form-action text-right">
                        <button type="button" className="btn btn-add-group btn-main" onClick={addStrategy}>
                            <div className="first">
                                <div className="second">
                                    <div className="third">
                                        <div className="fourth">+ Phase</div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

CompositionMeta.propTypes = {
    form: PropTypes.objectOf(PropTypes.any).isRequired,
    formNotes: PropTypes.objectOf(PropTypes.any).isRequired,
    formStrategies: PropTypes.objectOf(PropTypes.any).isRequired,
    addStrategy: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CompositionMeta;
