import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({ type, label, kind, size, display, link, onClick, disabled }) =>
    type === 'button' ? (
        <button type="button" className={`btn btn-${kind} btn-${size} btn-${display}`} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    ) : type === 'submit' ? (
        <input type="submit" className={`btn btn-${kind} btn-${size} btn-${display}`} value={label} disabled={disabled} />
    ) : (
        <Link role="button" className={`btn btn-${kind} btn-${size} btn-${display}`} to={link}>
            {label}
        </Link>
    );

Button.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    kind: PropTypes.string,
    size: PropTypes.string,
    display: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    type: 'link',
    label: 'Submit',
    kind: 'default',
    size: 'md',
    display: 'initial',
    link: '/',
    onClick: undefined,
    disabled: false,
};

export default Button;
