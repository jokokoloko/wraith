import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionAccount from '../redux/action/actionAccount';
import { ACCOUNT_CHECK_REQUEST, PROFILE_LOAD_REQUEST } from '../redux/type';
import { findByString } from '../filter';
import * as path from '../path';
import { PrivateRoute, PublicRoute } from '../access';
import _Private from './_Private';
import Login from './Login';
import Register from './Register';
import TestCall from './TestCall'; // remove
import TestWatch from './TestWatch'; // remove
import Team from './Team';
import About from './About';
import Home from './Home';
import Empty from './404';
import Compass from './region/Compass';
import Header from './region/Header';
import Footer from './region/Footer';
import Loader from './unit/Loader';

class Root extends Component {
    constructor(props) {
        super(props);
        this.onLogOut = this.onLogOut.bind(this);
    }
    componentDidMount() {
        const { actionAccount } = this.props;
        actionAccount.accountCheck(); // todo: add way to unsubscribe from listener
    }
    onLogOut() {
        const { actionAccount } = this.props;
        actionAccount.accountLogOut();
    }
    render() {
        const { loadingAccount, loadingProfile, account, profile } = this.props;
        let authenticated = false;
        account.authenticated && profile.id && (authenticated = true);
        return account.initialized === false || loadingAccount || loadingProfile ? (
            <Loader position="exact-center fixed" label={loadingProfile ? `Loading profile` : `Initializing`} />
        ) : (
            <Router>
                <Fragment>
                    <Compass />
                    <Header authenticated={authenticated} profile={profile} onLogOut={this.onLogOut} />

                    <Switch>
                        <PrivateRoute path={path._Private} component={_Private} authenticated={authenticated} />
                        <PublicRoute path={path.Login} component={Login} authenticated={authenticated} />
                        <PublicRoute path={path.Register} component={Register} authenticated={authenticated} />
                        <Route path="/test/call" component={TestCall} />
                        <Route path="/test/watch" component={TestWatch} />
                        <Route path={path.Team} component={Team} />
                        <Route path={path.About} component={About} />
                        <Route path={path.Root} component={Home} exact />
                        <Route component={Empty} />
                    </Switch>

                    <Footer />
                </Fragment>
            </Router>
        );
    }
}

Root.propTypes = {
    loadingAccount: PropTypes.bool.isRequired,
    loadingProfile: PropTypes.bool.isRequired,
    account: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    actionAccount: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ account, profile, calls }) {
    return {
        loadingAccount: findByString(calls, ACCOUNT_CHECK_REQUEST),
        loadingProfile: findByString(calls, PROFILE_LOAD_REQUEST),
        account,
        profile,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionAccount: bindActionCreators(actionAccount, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
