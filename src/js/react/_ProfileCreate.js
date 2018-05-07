import React, { Component } from 'react';
import { connect } from 'react-redux';
import Basic from './section/Basic';
import apiProfile from '../../api/apiProfile';

class _ProfileCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
        };
    }
    componentDidMount() {
        const { account } = this.props;
        apiProfile.profileLoad(account).then((profile) =>
            this.setState({
                profile,
            }),
        );
    }
    render() {
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <header>
                            <h1>Profile - Create</h1>
                        </header>
                    </Basic>
                </div>
            </main>
        );
    }
}

function mapStateToProps({ account }) {
    return {
        account,
    };
}

export default connect(mapStateToProps)(_ProfileCreate);
