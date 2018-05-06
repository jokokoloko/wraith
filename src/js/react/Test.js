import React, { Component } from 'react';
import Basic from './section/Basic';
import apiUser from '../../api/apiUser';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }
    componentDidMount() {
        apiUser.usersWatch().then((users) =>
            this.setState({
                users,
            }),
        );
    }
    render() {
        const { users } = this.state;
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-50 space-lg-80">
                        <header className="text-center">
                            <h1>Test</h1>
                        </header>
                    </Basic>
                    {users.length > 0 && (
                        <Basic space="space-xs-50 space-lg-80">
                            <section>
                                <ul>{users.map((user, index) => <li key={index}>{user.email}</li>)}</ul>
                            </section>
                        </Basic>
                    )}
                </div>
            </main>
        );
    }
}

export default Test;
