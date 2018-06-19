import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMapMarkerAlt from '@fortawesome/fontawesome-pro-regular/faMapMarkerAlt';
import apiUser from '../../api/apiUser';
import { findByProperty } from '../filter';
import Empty from './404';
import Basic from './section/Basic';
import Avatar from './unit/Avatar';
import Loader from './unit/Loader';

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingUser: true,
            user: {},
        };
    }
    componentDidMount() {
        const { id } = this.props; // issue: when not authenticated, refreshing a UserView page gets stuck on loading (possibly due to mounting too quickly/soon)
        id &&
            apiUser.userLoad(id).then((user) =>
                this.setState({
                    loadingUser: false,
                    user,
                }),
            );
    }
    render() {
        const { id } = this.props;
        const { loadingUser, user } = this.state;
        return id ? (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-50 space-lg-80">
                        <div className="row gutter-lg-80">
                            <div className="col-lg-3">
                                {loadingUser ? (
                                    <Loader position="exact-center fixed" label="Loading user" />
                                ) : (
                                    <header className="card card-panel">
                                        <div className="card-body">
                                            <Avatar
                                                position="fit exact-center"
                                                source={user.avatar ? user.avatar : 'http://via.placeholder.com/800?text=Avatar'}
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
                                            <h2 className="name-full">
                                                {user.name && user.name.first && user.name.last
                                                    ? `${user.name.first} ${user.name.last}`
                                                    : user.name && user.name.first
                                                        ? `${user.name.first}`
                                                        : user.name && user.name.last
                                                            ? `${user.name.last}`
                                                            : 'Name'}
                                            </h2>
                                            <h3 className="handle">@{user.handle ? `${user.handle}` : 'handle'}</h3>
                                            <address className="contact" itemType="http://schema.org/Organization" itemScope>
                                                <p className="address" itemProp="address" itemType="http://schema.org/PostalAddress" itemScope>
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                    {user.address && user.address.city && user.address.state && user.address.country ? (
                                                        <Fragment>
                                                            <span itemProp="addressLocality">{user.address.city}</span>
                                                            {', '}
                                                            <span itemProp="addressRegion">{user.address.state}</span>
                                                            {', '}
                                                            <span itemProp="addressCountry">{user.address.country}</span>
                                                        </Fragment>
                                                    ) : user.address && user.address.city && user.address.state ? (
                                                        <Fragment>
                                                            <span itemProp="addressLocality">{user.address.city}</span>
                                                            {', '}
                                                            <span itemProp="addressRegion">{user.address.state}</span>
                                                        </Fragment>
                                                    ) : user.address && user.address.city && user.address.country ? (
                                                        <Fragment>
                                                            <span itemProp="addressLocality">{user.address.city}</span>
                                                            {', '}
                                                            <span itemProp="addressCountry">{user.address.country}</span>
                                                        </Fragment>
                                                    ) : user.address && user.address.state && user.address.country ? (
                                                        <Fragment>
                                                            <span itemProp="addressRegion">{user.address.state}</span>
                                                            {', '}
                                                            <span itemProp="addressCountry">{user.address.country}</span>
                                                        </Fragment>
                                                    ) : user.address && user.address.city ? (
                                                        <span itemProp="addressLocality">{user.address.city}</span>
                                                    ) : user.address && user.address.state ? (
                                                        <span itemProp="addressRegion">{user.address.state}</span>
                                                    ) : user.address && user.address.country ? (
                                                        <span itemProp="addressCountry">{user.address.country}</span>
                                                    ) : (
                                                        'Location'
                                                    )}
                                                </p>
                                            </address>
                                        </div>
                                    </header>
                                )}
                            </div>
                        </div>
                    </Basic>
                </div>
            </main>
        ) : (
            <Route component={Empty} />
        );
    }
}

UserView.propTypes = {
    id: PropTypes.string,
};

function mapStateToProps({ users }, { match }) {
    const slug = match.params.slug;
    const user = findByProperty(users, 'slug', slug);
    return {
        id: user.id,
    };
}

export default connect(mapStateToProps)(UserView);
