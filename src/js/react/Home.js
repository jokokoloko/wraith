import React from 'react';
import Basic from './section/Basic';
import FormSearch from './form/FormSearch';

const Home = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <header className="text-center">
                    <h1>Home</h1>
                </header>

                <section>
                    <FormSearch />
                </section>
            </Basic>
        </div>
    </main>
);

export default Home;
