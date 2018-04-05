import React from 'react';
import Basic from './section/Basic';
import FormLogin from './form/FormLogin';

const Login = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <header className="text-center">
                    <h1>Login</h1>
                </header>

                <section>
                    <FormLogin />
                </section>
            </Basic>
        </div>
    </main>
);

export default Login;
