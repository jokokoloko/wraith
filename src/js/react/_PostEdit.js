import React from 'react';
import PropTypes from 'prop-types';
import * as path from '../path';
import Basic from './section/Basic';
import FormPost from './form/FormPost';

const _PostEdit = ({ location }) => {
    const page = location.pathname === path._Private + path._Post + path._PostAdd ? 'Add' : 'Edit';
    return (
        <main id="main" role="main">
            <div className="container-fluid">
                <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                    <header className="node-xs-50">
                        <h1>{`Post - ${page}`}</h1>
                    </header>

                    <section className="node-xs-50">
                        <FormPost />
                    </section>
                </Basic>
            </div>
        </main>
    );
};

_PostEdit.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _PostEdit;
