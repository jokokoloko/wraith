import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../path';
import Basic from './section/Basic';

const _PostHome = ({ match }) => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                <header className="d-flex">
                    <h1>Posts</h1>
                    <Link className="btn btn-default to-add" to={`${match.path}${path._PostAdd}`}>
                        Add New
                    </Link>
                </header>
            </Basic>
        </div>
    </main>
);

_PostHome.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _PostHome;
