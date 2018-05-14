import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { USERS_LOAD_REQUEST } from '../redux/type';
import { findByString } from '../filter';
import Basic from './section/Basic';
import Feed from './section/Feed';
import Loader from './unit/Loader';

const TestCall = ({ loadingUsers, calls, users }) => {
    const item = 'user';
    const loopUser = users.map((user, index) => {
        const count = index + 1;
        return (
            <article key={user.id} id={user.id} className={`${item} ${item}-${count} col`}>
                <header>
                    <h3>{user.id}</h3>
                </header>
            </article>
        );
    });
    console.log(calls);
    return (
        <main id="main" role="main">
            <div className="container-fluid">
                <Basic space="space-xs-50 space-lg-80">
                    <header className="text-center">
                        <h1>Test - Call</h1>
                    </header>
                </Basic>

                <Feed space="space-xs-50 space-lg-80" item={item}>
                    <section className="text-center">
                        {loadingUsers ? (
                            <Loader position="exact-center fixed" label="Loading users" />
                        ) : users.length > 0 ? (
                            <div className="row gutter-xs-30 gutter-lg-50">{loopUser}</div>
                        ) : (
                            <article className="empty">
                                <header>
                                    <h3>{`No ${item}s`}</h3>
                                </header>
                            </article>
                        )}
                    </section>
                </Feed>
            </div>
        </main>
    );
};

TestCall.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    loadingUsers: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps({ calls, users }) {
    return {
        loadingUsers: findByString(calls, USERS_LOAD_REQUEST),
        calls,
        users,
    };
}

export default connect(mapStateToProps)(TestCall);
