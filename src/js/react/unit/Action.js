import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Action = ({ type, action, kind, size, display, link, onClick }) => {
    let button = (
        <Link role="button" className={`btn btn-${kind} btn-${size} btn-${display}`} to={link}>
            {action}
        </Link>
    );
    if (type === 'button') {
        button = (
            <button type="button" className={`btn btn-${kind} btn-${size} btn-${display}`} onClick={onClick}>
                {action}
            </button>
        );
    } else if (type === 'submit') {
        button = <input type="submit" className={`btn btn-${kind} btn-${size} btn-${display}`} value={action} />;
    }
    return button;
};

Action.propTypes = {
    type: PropTypes.string,
    action: PropTypes.string,
    kind: PropTypes.string,
    size: PropTypes.string,
    display: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func,
};

Action.defaultProps = {
    type: 'link',
    action: 'Submit',
    kind: 'default',
    size: 'md',
    display: 'initial',
    link: '/',
    onClick: undefined,
};

export default Action;
