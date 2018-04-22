import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTachometer from '@fortawesome/fontawesome-pro-regular/faTachometer';
import * as path from '../../path';

const Account = ({ authenticated, onLogOut }) =>
    authenticated === true ? (
        <ul className="navbar-nav ml-auto account account-member">
            <li className="nav-item">
                <NavLink className="nav-link to-dashboard" activeClassName="active" to={path._Private}>
                    <FontAwesomeIcon icon={faTachometer} />
                </NavLink>
            </li>
            <li className="nav-item">
                <button type="button" className="nav-btn btn on-log-out" onClick={onLogOut} role="menuitem" tabIndex="-1">
                    Log Out
                </button>
            </li>
        </ul>
    ) : (
        <div className="navbar-action ml-auto account account-guest">
            <Link className="btn btn-lg btn-success btn-initial to-register" to={path.Register}>
                Register
            </Link>
            <Link className="btn btn-lg btn-primary btn-initial to-login" to={path.Login}>
                Log In
            </Link>
        </div>
    );

Account.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    // profile: PropTypes.objectOf(PropTypes.any).isRequired,
    onLogOut: PropTypes.func.isRequired,
};

export default Account;
