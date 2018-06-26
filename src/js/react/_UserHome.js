import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionUser from '../redux/action/actionUser';
import * as path from '../path';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class _UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingUsers: true,
        };
    }
    componentDidMount() {
        const { actionUser } = this.props;
        actionUser.usersLoad().then(() =>
            this.setState({
                loadingUsers: false,
            }),
        );
    }
    render() {
        const { users } = this.props;
        const { loadingUsers } = this.state;
        const item = 'user';
        const empty = '-';
        const labelUser = ['#', 'Email', 'First', 'Last', 'Handle', 'City', 'State', 'Action'];
        const loopUser = users.map((user, index) => {
            const count = index + 1;
            return (
                <tr key={user.id} id={user.id} className={`${item} ${item}-${count}`}>
                    <th scope="row">{count}</th>
                    <td>
                        <span className={`status status-${user.status}`}>&#9679;</span>
                        {user.email}
                    </td>
                    <td>{(user.name && user.name.first) || empty}</td>
                    <td>{(user.name && user.name.last) || empty}</td>
                    <td>{user.handle || empty}</td>
                    <td>{(user.address && user.address.city) || empty}</td>
                    <td>{(user.address && user.address.state) || empty}</td>
                    <td>
                        <Link to={`${path.Root}${user.slug}`}>View</Link>
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
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionUser: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ users }) {
    return {
        users,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionUser: bindActionCreators(actionUser, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(_UserHome);
