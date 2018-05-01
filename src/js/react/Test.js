import React, { Component } from 'react';
import Basic from './section/Basic';
import { users } from '../../api/firebase';
import { arrayToObject } from '../function';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersArrayPrivate: [],
        };
    }
    componentDidMount() {
        users.onSnapshot(
            (snapshot) => {
                const usersArrayPrivate = snapshot.docs.map((user) => user.data());
                const usersArrayPublic = snapshot.docs.map((user) => ({
                    id: user.id,
                }));
                this.setState({
                    usersArrayPrivate,
                    usersArrayPublic,
                    usersObjectPrivate: arrayToObject(usersArrayPrivate, 'uid'),
                    usersObjectPublic: arrayToObject(usersArrayPublic, 'id'),
                });
            },
            (error) => console.error('Error getting users:', error), // remove
        );
    }
    render() {
        const { usersArrayPrivate } = this.state;
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-50 space-lg-80">
                        <header className="text-center">
                            <h1>Test</h1>
                        </header>
                    </Basic>
                    {usersArrayPrivate.length > 0 && (
                        <Basic space="space-xs-50 space-lg-80">
                            <section>
                                <ul>{usersArrayPrivate.map((user, index) => <li key={index}>{user.email}</li>)}</ul>
                            </section>
                        </Basic>
                    )}
                </div>
            </main>
        );
    }
}

export default Test;
