import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../../path';

const Account = ({ authenticated, onLogOut }) => {
    const fieldClass = 'btn btn-lg';
    const wrapperClass = 'account ml-auto';
    return authenticated === true ? (
        <div className={`account-member ${wrapperClass}`}>
            <Link className={`to-dashboard ${fieldClass} btn-secondary btn-icon`} to={path._Private}>
                @
            </Link>
            <button type="button" className={`on-logout ${fieldClass} btn-danger btn-initial`} onClick={onLogOut} role="menuitem" tabIndex="-1">
                Log Out
            </button>
        </div>
    ) : (
        <div className={`account-guest ${wrapperClass}`}>
            <Link className={`to-register ${fieldClass} btn-success btn-initial`} to={path.Register}>
                Register
            </Link>
            <Link className={`to-login ${fieldClass} btn-primary btn-initial`} to={path.Login}>
                Log In
            </Link>
        </div>
    );
};

Account.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    // profile: PropTypes.objectOf(PropTypes.any).isRequired,
    onLogOut: PropTypes.func.isRequired,
};

export default Account;
