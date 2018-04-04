import React from 'react';
import Basic from './section/Basic';
import FormRegister from './form/FormRegister';

const Register = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <header className="text-center">
                    <h1>Register</h1>
                </header>

                <section>
                    <FormRegister />
                </section>
            </Basic>
        </div>
    </main>
);

export default Register;
