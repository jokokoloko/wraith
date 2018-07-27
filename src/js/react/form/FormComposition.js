import React from 'react';
import InputText from '../input/InputText';

const FormComposition = ({ formData, onTextChange }) => {
    const size = 'lg';
    return (
        <form id="form-composition" className={`form form-${size} mx-lg-auto`}>
            <InputText name="title" label="Comp Name" placeholder="Comp Name" value={formData.title} size={size} onChange={onTextChange} />
            <InputText
                type="area"
                name="description"
                label="description"
                placeholder="How does this comp win?"
                value={formData.description}
                size={size}
                onChange={onTextChange}
            />
        </form>
    );
};

export default FormComposition;
