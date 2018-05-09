import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/action/actionUser';
import PropTypes from 'prop-types';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class _UserHome extends Component {
    componentDidMount() {
        this.props.actions.usersLoad(true);
    }
    render() {
        const { loading, users } = this.props;
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
                            {loading ? (
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
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    loading: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps({ call, users }) {
    return {
        loading: call > 0,
        users,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(_UserHome);
