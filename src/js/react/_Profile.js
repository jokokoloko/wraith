import React from 'react';
import PropTypes from 'prop-types';
import Basic from './section/Basic';
import FormProfile from './form/FormProfile';

const _Profile = ({ authenticated }) => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                <header className="node-xs-50">
                    <h1>Profile</h1>
                </header>

                <section className="node-xs-50">
                    <FormProfile authenticated={authenticated} />
                </section>
            </Basic>
        </div>
    </main>
);

_Profile.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default _Profile;
