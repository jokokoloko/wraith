import React from 'react';
import PropTypes from 'prop-types';
import Basic from './section/Basic';
import Composition from './project/Composition';

const _CompositionEdit = ({ authenticated }) => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50">
                <section>
                    <Composition authenticated={authenticated} />
                </section>
            </Basic>
        </div>
    </main>
);

_CompositionEdit.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default _CompositionEdit;
