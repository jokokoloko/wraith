import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { PrivateRoute, PublicRoute } from '../access';
import * as path from '../path';
import * as actions from '../redux/action/actionAccount';
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
        this.removeListener = this.props.actions.accountCheck();
    }
    componentWillUnmount() {
        this.removeListener();
    }
    onLogOut() {
        this.props.actions.accountLogOut();
    }
    render() {
        const { account, profile } = this.props;
        const authenticated = account.authenticated;
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
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    account: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps({ account }) {
    return {
        account,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
