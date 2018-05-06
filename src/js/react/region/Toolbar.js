import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as client from '../../client';
import * as path from '../../path';

const Toolbar = ({ match }) => (
    <aside id="toolbar">
        <Link className="toolbar-brand" title={client.BRAND} rel="home" to={path.Root}>
            {client.BRAND}
        </Link>
        <ul className="toolbar-nav nav flex-column">
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}`} exact>
                    Dashboard
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}${path._Profile}`} exact>
                    Profile
                </NavLink>
            </li>
        </ul>
        <ul className="toolbar-nav nav flex-column">
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}${path._User}`}>
                    Users
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to={`${match.path}${path._Post}`}>
                    Posts
                </NavLink>
            </li>
        </ul>
    </aside>
);

Toolbar.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Toolbar;
