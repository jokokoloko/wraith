import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { PrivateRoute, PublicRoute } from '../access';
import * as path from '../path';
import * as actionAccount from '../redux/action/actionAccount';
import _Private from './_Private';
import Login from './Login';
import Register from './Register';
import Test from './Test'; // remove
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
        const { account, profile } = this.props;
        let authenticated = false;
        account.authenticated && account.uid && (authenticated = true);
        return account.initialized === false ? (
            <Loader position="exact-center fixed" label="Initializing" />
        ) : (
            <Router>
                <Fragment>
                    <Compass />
                    <Header authenticated={authenticated} profile={profile} onLogOut={this.onLogOut} />

                    <Switch>
                        <PrivateRoute path={path._Private} component={_Private} authenticated={authenticated} />
                        <PublicRoute path={path.Login} component={Login} authenticated={authenticated} />
                        <PublicRoute path={path.Register} component={Register} authenticated={authenticated} />
                        <Route path="/test" component={Test} />
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
    account: PropTypes.objectOf(PropTypes.any).isRequired,
    // profile: PropTypes.objectOf(PropTypes.any).isRequired,
    actionAccount: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ account }) {
    return {
        account,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionAccount: bindActionCreators(actionAccount, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
