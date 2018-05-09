import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../redux/action/actionProfile';
import Basic from './section/Basic';

class _ProfileCreate extends Component {
    componentDidMount() {
        const { actions, account } = this.props;
        actions.profileLoad(account);
    }
    render() {
        const { profile } = this.props;
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <header>
                            <h1>Profile - Create</h1>
                        </header>
                    </Basic>

                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <section>
                            <p>
                                <strong>ID:</strong> {profile.id}
                            </p>
                            <p>
                                <strong>Email:</strong> {profile.email}
                            </p>
                        </section>
                    </Basic>
                </div>
            </main>
        );
    }
}

_ProfileCreate.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    account: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps({ account, profile }) {
    return {
        account,
        profile,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(_ProfileCreate);
