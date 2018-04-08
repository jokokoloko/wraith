import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ type, name, label, placeholder, onChange, value, error, size }) => {
    const fieldClass = `form-control form-control-${size}`;
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += ' has-error';
    }
    return (
        <div className={wrapperClass}>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            {type === 'area' ? (
                <textarea
                    id={name}
                    className={fieldClass}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    autoComplete="on"
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    className={fieldClass}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    autoComplete="on"
                />
            )}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};

InputText.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    size: PropTypes.string,
};

InputText.defaultProps = {
    type: 'text',
    value: '',
    error: undefined,
    size: undefined,
};

export default InputText;
