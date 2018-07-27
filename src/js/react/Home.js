import React from 'react';
import Basic from './section/Basic';
import Composition from './project/Composition';

const Home = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <section>
                    <Composition />
                </section>
            </Basic>
        </div>
    </main>
);

export default Home;
