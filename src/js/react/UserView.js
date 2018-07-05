import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionView from '../redux/action/actionView';
import Basic from './section/Basic';
import Avatar from './unit/Avatar';
import Loader from './unit/Loader';

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingView: true,
        };
    }
    componentDidMount() {
        const { match, actionView } = this.props;
        actionView.viewLoad(match.params.slug).then(() =>
            this.setState({
                loadingView: false,
            }),
        );
    }
    render() {
        const { view } = this.props;
        const { loadingView } = this.state;
        return loadingView ? (
            <Loader position="exact-center fixed" label="Loading view" />
        ) : (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-50 space-lg-80">
                        {view.id ? (
                            <div className="row gutter-lg-80">
                                <div className="col-lg-3">
                                    <header className="card card-panel">
                                        <div className="card-body">
                                            <Avatar
                                                position="fit exact-center"
                                                source={view.avatar || 'http://via.placeholder.com/800?text=Avatar'}
                                                alternate={
                                                    view.name && view.name.first && view.name.last
                                                        ? `${view.name.first} ${view.name.last}`
                                                        : view.name && view.name.first
                                                            ? `${view.name.first}`
                                                            : view.name && view.name.last
                                                                ? `${view.name.last}`
                                                                : view.handle
                                                                    ? view.handle
                                                                    : 'Avatar'
                                                }
                                            />
                                            <h2 className="card-headline name-full">
                                                {view.name && view.name.first && view.name.last
                                                    ? `${view.name.first} ${view.name.last}`
                                                    : view.name && view.name.first
                                                        ? `${view.name.first}`
                                                        : view.name && view.name.last
                                                            ? `${view.name.last}`
                                                            : 'Name'}
                                            </h2>
                                            <h3 className="card-tagline handle">@{view.handle || 'handle'}</h3>
                                            <address className="card-meta contact" itemType="http://schema.org/Organization" itemScope>
                                                <p className="address" itemProp="address" itemType="http://schema.org/PostalAddress" itemScope>
                                                    {view.address && view.address.city && view.address.state && view.address.country ? (
                                                        <Fragment>
                                                            <span itemProp="addressLocality">{view.address.city}</span>
                                                            {', '}
                                                            <span itemProp="addressRegion">{view.address.state}</span>
                                                            {', '}
                                                            <span itemProp="addressCountry">{view.address.country}</span>
                                                        </Fragment>
                                                    ) : view.address && view.address.city && view.address.state ? (
                                                        <Fragment>
                                                            <span itemProp="addressLocality">{view.address.city}</span>
                                                            {', '}
                                                            <span itemProp="addressRegion">{view.address.state}</span>
                                                        </Fragment>
                                                    ) : view.address && view.address.city && view.address.country ? (
                                                        <Fragment>
                                                            <span itemProp="addressLocality">{view.address.city}</span>
                                                            {', '}
                                                            <span itemProp="addressCountry">{view.address.country}</span>
                                                        </Fragment>
                                                    ) : view.address && view.address.state && view.address.country ? (
                                                        <Fragment>
                                                            <span itemProp="addressRegion">{view.address.state}</span>
                                                            {', '}
                                                            <span itemProp="addressCountry">{view.address.country}</span>
                                                        </Fragment>
                                                    ) : view.address && view.address.city ? (
                                                        <span itemProp="addressLocality">{view.address.city}</span>
                                                    ) : view.address && view.address.state ? (
                                                        <span itemProp="addressRegion">{view.address.state}</span>
                                                    ) : view.address && view.address.country ? (
                                                        <span itemProp="addressCountry">{view.address.country}</span>
                                                    ) : (
                                                        'Location'
                                                    )}
                                                </p>
                                            </address>
                                        </div>
                                    </header>
                                </div>
                            </div>
                        ) : (
                            <header className="empty text-center">
                                <h1>404 - User</h1>
                            </header>
                        )}
                    </Basic>
                </div>
            </main>
        );
    }
}

UserView.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    view: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ view }) {
    return {
        view,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionView: bindActionCreators(actionView, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserView);
