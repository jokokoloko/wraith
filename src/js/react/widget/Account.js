import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-pro-regular/faHome';
import faTachometer from '@fortawesome/fontawesome-pro-regular/faTachometer';
import * as path from '../../path';

const Account = ({ location, authenticated, onLogOut }) => {
    const _Private = location.pathname.includes(path._Private);
    return authenticated === true ? (
        <ul className="navbar-nav ml-auto account account-member">
            <li className="nav-item">
                <NavLink
                    className={`nav-link no-focus to-${_Private ? 'home' : 'dashboard'}`}
                    activeClassName="active"
                    to={_Private ? path.Root : path._Private}
                exact>
                    <FontAwesomeIcon icon={_Private ? faHome : faTachometer} />
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
};

Account.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    authenticated: PropTypes.bool.isRequired,
    // profile: PropTypes.objectOf(PropTypes.any).isRequired,
    onLogOut: PropTypes.func.isRequired,
};

export default Account;
