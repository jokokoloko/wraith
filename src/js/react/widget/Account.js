import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as client from '../../client';
import * as logic from '../../logic';
import * as path from '../../path';
import Avatar from '../unit/Avatar';
import Dropdown from '../unit/Dropdown';

const Account = ({ location, authenticated, profile, onLogOut }) => {
    const profileName = logic.userName(profile);
    const profileAvatar = profile.avatar ? (
        <Avatar position="fit exact-center" source={profile.avatar || client.EMPTY_AVATAR} alternate={logic.userNameHandle(profile, 'Avatar')} />
    ) : (
        'Account'
    );
    return authenticated === true ? (
        <ul className="navbar-nav justify-content-end account account-member">
            <li className="nav-item">
                <NavLink className="nav-link to-profile" to={`${path.User}/${profile.slug}`}>
                    Profile
                </NavLink>
            </li>
            <Dropdown name="account" label={profileAvatar} alignment="right">
                {profileName && <strong className="dropdown-header">{profileName}</strong>}
                <p className="dropdown-text">{profile.email}</p>
                <div className="dropdown-divider" />
                <NavLink className="dropdown-item to-profile" to={path._Profile}>
                    Profile
                </NavLink>
                <div className="dropdown-divider" />
                <button type="button" className="dropdown-item on-log-out" onClick={onLogOut}>
                    Log Out
                </button>
            </Dropdown>
        </ul>
    ) : (
        <ul className="navbar-nav justify-content-end account account-guest">
            <li className="nav-item">
                <NavLink className="nav-link to-login" to={path.Login}>
                    Log In
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link to-register btn btn-register" to={path.Register}>
                    <div className="first">
                        <div className="second">
                            <div className="third">
                                <div className="fourth">Sign Up</div>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </li>
        </ul>
    );
};

Account.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    authenticated: PropTypes.bool.isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    onLogOut: PropTypes.func.isRequired,
};

export default Account;
