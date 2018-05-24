import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionProfile from '../redux/action/actionProfile';
import Basic from './section/Basic';
import Button from './unit/Button';

const TestAction = ({ profile, actionProfile }) => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <header className="text-center">
                    <h1>Test - Action</h1>
                </header>

                <section className="text-center">
                    <Button type="button" onClick={() => actionProfile.profileEdit(profile)} />
                </section>
            </Basic>
        </div>
    </main>
);

function mapStateToProps({ profile }) {
    return {
        profile: Object.assign({}, profile, {
            nameFirst: 'Jonathan',
            nameLast: 'Howland',
        }),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionProfile: bindActionCreators(actionProfile, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestAction);
