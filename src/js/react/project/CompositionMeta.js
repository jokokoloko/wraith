import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../input/InputText';

const CompositionMeta = ({ form, onChange }) => {
    const size = 'lg';
    return (
        <form id="form-composition" className={`form form-${size} panel`}>
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
        </form>
    );
};

CompositionMeta.propTypes = {
    form: PropTypes.objectOf(PropTypes.any).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CompositionMeta;
