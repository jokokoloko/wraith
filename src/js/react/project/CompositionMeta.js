import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../input/InputText';

const CompositionMeta = ({ form, onChange }) => {
    const size = 'lg';
    return (
        <form id="form-composition" className={`form form-${size}`}>
            <div className="panel mt-5">
                <InputText
                    name="title"
                    label="Title"
                    placeholder="Title"
                    size={size}
                    onChange={onChange}
                    value={form.title}
                />
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
                <InputText
                    type="area"
                    name="description"
                    label="Description"
                    placeholder="Description"
                    size={size}
                    onChange={onChange}
                    value={form.foo}
                />
                <InputText
                    type="area"
                    name="description"
                    label="Description"
                    placeholder="Description"
                    size={size}
                    onChange={onChange}
                    value={form.bar}
                />
            </div>
        </form>
    );
};

CompositionMeta.propTypes = {
    form: PropTypes.objectOf(PropTypes.any).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CompositionMeta;
