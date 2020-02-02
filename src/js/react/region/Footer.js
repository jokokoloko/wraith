import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as client from '../../client';
import * as path from '../../path';

const Footer = ({ location }) => {
    const type = 'fixed';
    let container = 'container';
    return (
        <footer id="footer" className={`navbar navbar-expand-lg navbar-${type}-bottom bottom`} role="contentinfo">
            <div className={`${container} justify-content-center`}>
                <p className="copyright navbar-text">
                    <Link className="navbar-link" title={client.BRAND} rel="home" to={path.Root}>
                        {client.BRAND}
                    </Link>{' '}
                    &copy; {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Footer);
