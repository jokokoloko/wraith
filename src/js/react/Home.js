import React from 'react';
import PropTypes from 'prop-types';
import Basic from './section/Basic';
import Composition from './project/Composition';

const Home = ({ authenticated }) => (
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

Home.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default Home;
