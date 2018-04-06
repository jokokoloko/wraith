import React from 'react';
import Basic from './section/Basic';

const About = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <header className="text-center">
                    <h1>About</h1>
                    <p>React ES6 Starter Application.</p>
                </header>
            </Basic>
        </div>
    </main>
);

export default About;
