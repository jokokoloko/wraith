import React from 'react';
import PropTypes from 'prop-types';
import InputSearch from '../input/InputSearch';

const FormSearch = ({ onReset, onSubmit }) => {
    const size = 'lg';
    return (
        <form id="form-search" className={`form form-${size}`} onSubmit={onSubmit}>
            <InputSearch name="search" label="Search" placeholder="Search" size={size} onReset={onReset} />
        </form>
    );
};

FormSearch.propTypes = {
    // onChange: PropTypes.func.isRequired,
    // onSearch: PropTypes.func.isRequired,
    onReset: PropTypes.func,
    onSubmit: PropTypes.func,
    // value: PropTypes.objectOf(PropTypes.string),
    // error: PropTypes.objectOf(PropTypes.string),
    // searching: PropTypes.bool.isRequired,
};

FormSearch.defaultProps = {
    onReset: undefined,
    onSubmit: undefined,
    value: undefined,
    error: undefined,
};

export default FormSearch;
