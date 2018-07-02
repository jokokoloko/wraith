import React from 'react';
import PropTypes from 'prop-types';

const InputSearch = ({ name, label, placeholder, size, onReset, value, error, group, reference }) => {
    const fieldClass = 'form-control';
    let wrapperClass = 'form-group';
    error && error.length > 0 && (wrapperClass += ' has-error');
    return (
        <div className={wrapperClass}>
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            <div className={`input-group input-group-${size}`}>
                <input
                    type="search"
                    id={name}
                    className={fieldClass}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    autoComplete="on"
                    data-group={group}
                    ref={reference}
                />
                <div className="input-group-append">
                    <button type="reset" className="btn btn-outline-secondary btn-icon btn-reset" onClick={onReset}>
                        Reset
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-icon btn-location">
                        Location
                    </button>
                    <button type="submit" className="btn btn-info btn-icon btn-search">
                        Search
                    </button>
                </div>
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};

InputSearch.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    size: PropTypes.string,
    onReset: PropTypes.func,
    // onChange: PropTypes.func.isRequired,
    // onSearch: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    group: PropTypes.string,
    reference: PropTypes.object,
};

InputSearch.defaultProps = {
    size: 'md',
    onReset: undefined,
    value: '',
    error: undefined,
    group: undefined,
    reference: undefined,
};

export default InputSearch;
