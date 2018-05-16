import React from 'react';
import PropTypes from 'prop-types';

const InputButton = ({ type, name, label, kind, size, display, onClick, status }) => (
    <input
        type={type}
        className={`btn btn-${kind} btn-${size} btn-${display} btn-${name}`}
        name={name}
        onClick={onClick}
        value={label}
        disabled={status}
    />
);

InputButton.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    kind: PropTypes.string,
    size: PropTypes.string,
    display: PropTypes.string,
    onClick: PropTypes.func,
    status: PropTypes.bool,
};

InputButton.defaultProps = {
    type: 'submit',
    name: 'submit',
    label: 'Submit',
    kind: 'default',
    size: 'md',
    display: 'initial',
    onClick: undefined,
    status: false,
};

export default InputButton;
