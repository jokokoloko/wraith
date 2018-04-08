import React from 'react';
import PropTypes from 'prop-types';

const InputSearch = ({ name, label, placeholder, onReset, value, error, size }) => {
    const fieldClass = 'form-control';
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += ' has-error';
    }
    return (
        // add Font Awesome icons to buttons
        <div className={wrapperClass}>
            <label className="sr-only" htmlFor={name}>
                {label}
            </label>
            <div className={`input-group input-group-${size}`}>
                <input type="search" id={name} className={fieldClass} name={name} placeholder={placeholder} value={value} autoComplete="on" />
                <div className="input-group-append">
                    <input type="reset" className="btn btn-outline-secondary btn-reset" name="reset" onClick={onReset} value="Reset" />
                    <input type="button" className="btn btn-outline-secondary btn-location" name="location" value="Location" />
                    <input type="submit" className="btn btn-success btn-search" name="search" value="Search" />
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
    onReset: PropTypes.func,
    // onChange: PropTypes.func.isRequired,
    // onSearch: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    size: PropTypes.string,
};

InputSearch.defaultProps = {
    onReset: undefined,
    value: '',
    error: undefined,
    size: undefined,
};

export default InputSearch;
