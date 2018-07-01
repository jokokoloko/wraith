import React from 'react';
import Basic from './section/Basic';
import ChampionSelect from './widget/ChampionSelect';
import FormTeamComp from './form/FormTeamComp';

const Home = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <section>
                    <ChampionSelect />
                </section>
                <section>
                    <FormTeamComp />
                </section>
            </Basic>
        </div>
    </main>
);

export default Home;
