import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Basic from './section/Basic';
import Loader from './unit/Loader';

const Team = ({ loading, users }) => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <header className="text-center">
                    <h1>Team</h1>
                </header>
            </Basic>

            <Basic space="space-xs-50 space-lg-80">
                <section className="text-center">
                    {loading ? (
                        <Loader position="exact-center fixed" label="Loading users" />
                    ) : users.length > 0 ? (
                        <ul className="list-unstyled">
                            {users.map((user, index) => (
                                <li key={user.id} className={`item-${index + 1}`}>
                                    {user.id}
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

Team.propTypes = {
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

export default connect(mapStateToProps)(Team);
