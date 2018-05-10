import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as client from '../../client';
import * as path from '../../path';
import Account from '../widget/Account';

const Header = ({ location, authenticated, onLogOut }) => {
    const _Private = location.pathname.includes(path._Private);
    const type = 'fixed';
    let container = 'container';
    _Private && (container = 'container-fluid');
    return (
        <header id="header" className={`navbar navbar-expand-lg navbar-${type}-top ${type} ${type}-top`} role="banner">
            <div className={container}>
                {!_Private && (
                    <Link className="navbar-brand" title={client.BRAND} rel="home" to={path.Root}>
                        {client.BRAND}
                    </Link>
                )}

                <button className="navbar-menu navbar-toggler" type="button">
                    <span className="icon-text sr-only">Menu</span>
                    <span className="icon-bar">&#9472;</span>
                    <span className="icon-bar">&#9472;</span>
                    <span className="icon-bar">&#9472;</span>
                </button>

                <nav className="navbar-collapse collapse">
                    {!_Private && (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to={path.About}>
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to={path.Team}>
                                    Team
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to={path.Register}>
                                    Register
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to={path.Login}>
                                    Login
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to={path._Private}>
                                    Dashboard
                                </NavLink>
                            </li>
                        </ul>
                    )}
                    <Account location={location} authenticated={authenticated} onLogOut={onLogOut} />
                </nav>
            </div>
        </header>
    );
};

Header.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    authenticated: PropTypes.bool.isRequired,
    // profile: PropTypes.objectOf(PropTypes.any).isRequired,
    onLogOut: PropTypes.func.isRequired,
};

export default withRouter(Header);
