import React from 'react';
import Basic from './section/Basic';
import FormProfile from './form/FormProfile';

const _Profile = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                <header className="node-xs-50">
                    <h1>Profile</h1>
                </header>

                <section className="node-xs-50">
                    <FormProfile />
                </section>
            </Basic>
        </div>
    </main>
);

export default _Profile;
