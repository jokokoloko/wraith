import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { USERS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import Basic from './section/Basic';
import Feed from './section/Feed';
import Avatar from './unit/Avatar';
import Loader from './unit/Loader';

const User = ({ loadingUsers, users }) => {
    const item = 'user';
    const loopUser = users.map((user, index) => {
        const count = index + 1;
        return (
            <article key={user.id} id={user.id} className={`${item} ${item}-${count} col-lg-3`}>
                <header className="card card-panel">
                    <Link className="card-body" to={`/${user.slug}`}>
                        <Avatar
                            position="fit exact-center"
                            source={user.avatar || 'http://via.placeholder.com/800?text=Avatar'}
                            alternate={
                                user.name && user.name.first && user.name.last
                                    ? `${user.name.first} ${user.name.last}`
                                    : user.name && user.name.first
                                        ? `${user.name.first}`
                                        : user.name && user.name.last
                                            ? `${user.name.last}`
                                            : user.handle
                                                ? user.handle
                                                : 'Avatar'
                            }
                        />
                        <h2 className="card-headline name-full">
                            {user.name && user.name.first && user.name.last
                                ? `${user.name.first} ${user.name.last}`
                                : user.name && user.name.first
                                    ? `${user.name.first}`
                                    : user.name && user.name.last
                                        ? `${user.name.last}`
                                        : 'Name'}
                        </h2>
                        <h3 className="card-tagline handle">@{user.handle || 'handle'}</h3>
                    </Link>
                </header>
            </article>
        );
    });
    return (
        <main id="main" role="main">
            <div className="container-fluid">
                <Basic space="space-xs-30 space-lg-80">
                    <header className="text-center">
                        <h1>Users</h1>
                    </header>
                </Basic>

                <Feed space="space-xs-20 space-lg-80" item={item}>
                    <section className="text-center">
                        {loadingUsers ? (
                            <Loader position="exact-center fixed" label="Loading users" />
                        ) : users.length > 0 ? (
                            <div className="row gutter-20 gutter-lg-80">{loopUser}</div>
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

User.propTypes = {
    loadingUsers: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps({ calls, users }) {
    return {
        loadingUsers: findByString(calls, removeStatus(USERS_LOAD_REQUEST)),
        users,
    };
}

export default connect(mapStateToProps)(User);
