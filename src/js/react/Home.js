import React from 'react';
import Basic from './section/Basic';
import ChampionGrid from './widget/ChampionGrid';

const Home = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <section>
                    <ChampionGrid />
                </section>
            </Basic>
        </div>
    </main>
);

export default Home;
