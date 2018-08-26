import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from '../input/InputText';
import { positions } from '../../composition';

class CompositionMeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curPosition: "top"
        };
        this.selectPosition = this.selectPosition.bind(this);
    }

    selectPosition(position) {
        this.setState({
            curPosition: position
        });
    }

    render() {
        const { form, onChange } = this.props;
        let { curPosition } = this.state;
        const size = 'lg';
        const buttonGroup = positions.map((pos, idx) => {
            return (
                <button key={`btn-${idx}`} type="button"
                    className="btn btn-info"
                    onClick={() => this.selectPosition(pos)}>
                    {pos}
                </button>
            );
        });
        return (
            <form id="form-composition" className={`form form-${size}`}>
                <div className="panel mt-5">
                    <InputText name="title" label="Title" placeholder="Title" size={size} onChange={onChange} value={form.title} />
                    <InputText
                        type="area"
                        name="description"
                        label="Description"
                        placeholder="Description"
                        size={size}
                        onChange={onChange}
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
                        onChange={onChange}
                        value={form[curPosition].notes}
                    />
                    <InputText
                        type="area"
                        name="ban"
                        label="ban"
                        placeholder="Ban"
                        group={curPosition}
                        size={size}
                        onChange={onChange}
                        value={form[curPosition].ban} />
                </div>
            </form>
        );
    }

};

CompositionMeta.propTypes = {
    form: PropTypes.objectOf(PropTypes.any).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CompositionMeta;
