import React from 'react';
import Basic from './section/Basic';
import ChampionSelect from './widget/ChampionSelect';

const Home = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <section>
                    <ChampionSelect />
                </section>
            </Basic>
        </div>
    </main>
);

export default Home;
