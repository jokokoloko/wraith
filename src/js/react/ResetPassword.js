import React from 'react';
import Basic from './section/Basic';
import FormResetPassword from './form/FormResetPassword';

const ResetPassword = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <header className="text-center">
                    <h1>Reset Password</h1>
                </header>

                <section>
                    <FormResetPassword />
                </section>
            </Basic>
        </div>
    </main>
);

export default ResetPassword;
