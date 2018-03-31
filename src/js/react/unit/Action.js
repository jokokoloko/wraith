import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Action = ({ type, action, kind, size, link, onClick }) => {
    let button = (
        <Link role="button" className={`btn btn-${kind} btn-${size}`} to={link}>
            {action}
        </Link>
    );
    if (type === 'button') {
        button = (
            <button type="button" className={`btn btn-${kind} btn-${size}`} onClick={onClick}>
                {action}
            </button>
        );
    } else if (type === 'submit') {
        button = <input type="submit" className={`btn btn-${kind} btn-${size}`} value={action} />;
    }
    return button;
};

Action.propTypes = {
    type: PropTypes.string,
    action: PropTypes.string,
    kind: PropTypes.string,
    size: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func,
};

Action.defaultProps = {
    type: 'link',
    action: 'Submit',
    kind: 'default',
    size: 'md',
    link: '/',
    onClick: undefined,
};

export default Action;
