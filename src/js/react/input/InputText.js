import React from 'react';
import PropTypes from 'prop-types';
import Tip from '../unit/Tip';

const InputText = ({ type, name, label, placeholder, size, onChange, value, error, group, reference, tip }) => {
    const fieldClass = `form-control form-control-${size}`;
    let wrapperClass = 'form-group';
    error && error.length > 0 && (wrapperClass += ' has-error');
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
                    data-group={group}
                    ref={reference}
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
                    data-group={group}
                    ref={reference}
                />
            )}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {tip && <Tip />}
        </div>
    );
};

InputText.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    size: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    group: PropTypes.string,
    reference: PropTypes.object,
};

InputText.defaultProps = {
    type: 'text',
    size: 'md',
    value: '',
    error: undefined,
    group: undefined,
    reference: undefined,
};

export default InputText;
