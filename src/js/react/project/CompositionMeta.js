import React from 'react';
import InputText from '../input/InputText';

const CompositionMeta = ({ formData, onTextChange }) => {
    const size = 'lg';
    return (
        <form id="form-composition" className={`form form-${size} panel`}>
            <InputText name="title" label="Title" placeholder="Title" value={formData.title} size={size} onChange={onTextChange} />
            <InputText
                type="area"
                name="description"
                label="Description"
                placeholder="Description"
                value={formData.description}
                size={size}
                onChange={onTextChange}
            />
        </form>
    );
};

export default CompositionMeta;
