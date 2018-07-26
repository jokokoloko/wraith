import React from 'react';
import InputText from '../input/InputText';

const FormComposition = ({ formData, onTextChange }) => {
    const size = 'lg';
    return (
        <form className={`form form-${size} mx-lg-auto`}>
            <div className="form-row form-gutter-20">
                <InputText name="title" label="Comp Name" placeholder="Comp Name" value={formData.title} size={size} onChange={onTextChange} />
            </div>
            <div className="form-row form-gutter-20">
                <InputText
                    type="area"
                    name="description"
                    label="description"
                    placeholder="How does this comp win?"
                    value={formData.description}
                    size={size}
                    onChange={onTextChange}
                />
            </div>
        </form>
    );
};

export default FormComposition;
