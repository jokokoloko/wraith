import React from 'react';
import Basic from './section/Basic';

const PostView = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <header className="text-center">
                    <h1>Post</h1>
                </header>
            </Basic>
        </div>
    </main>
);

export default PostView;
