import React from 'react';
import { Redirect } from 'react-router-dom';
import fakeAuth from '../../api/fakeAuth';

class Login extends React.Component {
    state = {
        redirectToReferrer: false,
    };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
        console.log(fakeAuth.isAuthenticated);
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <p>You must log in to view the page at {from.pathname}</p>
                    <button onClick={this.login}>Log in</button>
                </div>
            </main>
        );
    }
}

export default Login;
