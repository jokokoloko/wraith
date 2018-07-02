import React from 'react';
import Basic from './section/Basic';

const _PostHome = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                <header>
                    <h1>Posts</h1>
                </header>
            </Basic>
        </div>
    </main>
);

export default _PostHome;
