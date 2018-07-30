import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionView from '../redux/action/actionView';
import * as actionComposition from '../redux/action/actionComposition';
import * as client from '../client';
import * as logic from '../logic';
import * as path from '../path';
import Basic from './section/Basic';
import Contact from './widget/Contact';
import Avatar from './unit/Avatar';
import Loader from './unit/Loader';

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingView: true,
            loadingCompositions: true,
        };
    }
    componentDidMount() {
        const { match, actionView, actionComposition } = this.props;
        actionView.viewLoad(match.params.slug).then((user) => {
            user.view &&
                actionComposition.compositionsLoadByUser(user.view.id).then(() =>
                    this.setState({
                        loadingCompositions: false,
                    }),
                );
            this.setState({
                loadingView: false,
            });
        });
    }
    render() {
        const { view: user, profile, compositions } = this.props;
        const { loadingView, loadingCompositions } = this.state;
        const userName = logic.userName(user);
        const item = 'composition';
        const loopComposition = compositions.map((composition, index) => {
            const count = compositions.length - index;
            return (
                <article key={composition.id} id={composition.id} className={`${item} ${item}-${count} node-xs-20`}>
                    <header className="card card-panel">
                        <div className="card-body">
                            <h3 className="composition-title card-headline">{composition.title}</h3>
                            <p className="composition-excerpt">
                                {composition.excerpt}... <Link to={`/${composition.id}`}>View</Link>
                                {profile.id === composition.user && (
                                    <Fragment>
                                        <span className="separator"> - </span>
                                        <Link to={`${path._Edit}/${composition.id}`}>Edit</Link>
                                    </Fragment>
                                )}
                            </p>
                        </div>
                    </header>
                </article>
            );
        });
        return loadingView ? (
            <Loader position="exact-center fixed" label="Loading view" />
        ) : (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-20 space-lg-80">
                        {user.id ? (
                            <div className="row gutter-20 gutter-lg-80">
                                <div className="col-lg-3">
                                    <header className="card card-panel">
                                        <div className="card-body">
                                            <Avatar
                                                position="fit exact-center"
                                                source={user.avatar || client.EMPTY_AVATAR}
                                                alternate={logic.userNameHandle(user, 'Avatar')}
                                            />
                                            {userName && <h1 className="user-name user-name-first user-name-last card-headline">{userName}</h1>}
                                            {user.handle && <h2 className="user-handle card-tagline">@{user.handle || 'handle'}</h2>}
                                            <Contact className="user-contact card-meta" item={user} />
                                            <div className="card-statistic">
                                                <p className="card-statistic-compositions">
                                                    Compositions: {user.compositions ? Object.keys(user.compositions).length : 0}
                                                </p>
                                            </div>
                                        </div>
                                    </header>
                                </div>

                                <div className="col">
                                    {loadingCompositions ? (
                                        <Loader position="exact-center fixed" label="Loading compositions" />
                                    ) : compositions.length > 0 ? (
                                        loopComposition
                                    ) : (
                                        <article className="empty">
                                            <header>
                                                <h3>{`No ${item}s`}</h3>
                                            </header>
                                        </article>
                                    )}
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
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    view: PropTypes.objectOf(PropTypes.any).isRequired,
    compositions: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
    actionComposition: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ profile, view, compositions }) {
    return {
        profile,
        view,
        compositions,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionView: bindActionCreators(actionView, dispatch),
        actionComposition: bindActionCreators(actionComposition, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserView);
