import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMapMarker from '@fortawesome/fontawesome-pro-regular/faMapMarker';
import faSearch from '@fortawesome/fontawesome-pro-regular/faSearch';
import faTimesCircle from '@fortawesome/fontawesome-pro-regular/faTimesCircle';

const InputSearch = ({ name, label, placeholder, size, onReset, value, error }) => {
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
                    <button type="reset" className="btn btn-outline-secondary btn-icon btn-reset" onClick={onReset}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-icon btn-location">
                        <FontAwesomeIcon icon={faMapMarker} />
                    </button>
                    <button type="submit" className="btn btn-info btn-icon btn-search">
                        <FontAwesomeIcon icon={faSearch} />
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
};

InputSearch.defaultProps = {
    size: 'md',
    onReset: undefined,
    value: '',
    error: undefined,
};

export default InputSearch;
