import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionUser from '../redux/action/actionUser';
import { USERS_LOAD_REQUEST } from '../redux/type';
import { findByString } from '../filter';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class _UserHome extends Component {
    componentDidMount() {
        const { actionUser } = this.props;
        actionUser.usersLoad(true);
    }
    render() {
        const { loadingUsers, users } = this.props;
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <header>
                            <h1>Users</h1>
                        </header>
                    </Basic>

                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <section>
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

_UserHome.propTypes = {
    loadingUsers: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionUser: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ calls, users }) {
    return {
        loadingUsers: findByString(calls, USERS_LOAD_REQUEST),
        users,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionUser: bindActionCreators(actionUser, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(_UserHome);
