import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        const item = 'user';
        const { loadingUsers, users } = this.props;
        const labelUser = ['#', 'Email', 'First', 'Last', 'Handle', 'City', 'State', 'Action'];
        const loopUser = users.map((user, index) => {
            const count = index + 1;
            return (
                <tr key={user.id} id={user.id} className={`${item} ${item}-${count}`}>
                    <th scope="row">{count}</th>
                    <td>{user.email}</td>
                    <td>{user.name && user.name.first ? user.name.first : '-'}</td>
                    <td>{user.name && user.name.last ? user.name.last : '-'}</td>
                    <td>{user.handle ? user.handle : '-'}</td>
                    <td>{user.address && user.address.city ? user.address.city : '-'}</td>
                    <td>{user.address && user.address.state ? user.address.state : '-'}</td>
                    <td>
                        <Link to={`/user/${user.slug}`}>View</Link>
                    </td>
                </tr>
            );
        });
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <header className="node-xs-50">
                            <h1>Users</h1>
                        </header>

                        <section className="node-xs-50">
                            {loadingUsers ? (
                                <Loader position="exact-center fixed" label="Loading users" />
                            ) : (
                                <div className="table-container table-responsive-sm">
                                    <table className={`table table-striped table-bordered table-style table-size-80 table-${item}`}>
                                        <thead>
                                            <tr>
                                                {labelUser.map((name, index) => {
                                                    const count = index + 1;
                                                    return (
                                                        <th key={`label-${count}`} className={`label label-${count}`} scope="col">
                                                            {name}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {users.length > 0 ? (
                                                loopUser
                                            ) : (
                                                <tr className={`${item} ${item}-empty`}>
                                                    <th scope="row">0</th>
                                                    <td>{`No ${item}s`}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
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
