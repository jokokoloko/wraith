import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionUser from '../redux/action/actionUser';
import { USERS_WATCH_REQUEST } from '../redux/type';
import { findByString } from '../filter';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class TestWatch extends Component {
    componentDidMount() {
        const { actionUser } = this.props;
        actionUser.usersWatch(true);
    }
    render() {
        const { loadingUsers, users } = this.props;
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-50 space-lg-80">
                        <header className="text-center">
                            <h1>Test - Watch</h1>
                        </header>
                    </Basic>

                    <Basic space="space-xs-50 space-lg-80">
                        <section className="text-center">
                            {loadingUsers ? (
                                <Loader position="exact-center fixed" label="Loading users" />
                            ) : users.length > 0 ? (
                                <ul className="list-unstyled">
                                    {users.map((user, index) => (
                                        <li key={user.id} className={`item-${index + 1}`}>
                                            {user.email}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="empty">No users.</p>
                            )}
                        </section>
                    </Basic>
                </div>
            </main>
        );
    }
}

TestWatch.propTypes = {
    loadingUsers: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionUser: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ calls, users }) {
    return {
        loadingUsers: findByString(calls, USERS_WATCH_REQUEST),
        users,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionUser: bindActionCreators(actionUser, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestWatch);
