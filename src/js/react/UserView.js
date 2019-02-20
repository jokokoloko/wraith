import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiView from '../../api/apiView';
import apiComposition from '../../api/apiComposition';
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
            view: {},
            compositions: [],
        };
    }
    componentDidMount() {
        this.loadView();
    }
    componentDidUpdate(prevProps) {
        const { match } = this.props;
        match.params.slug !== prevProps.match.params.slug &&
            this.setState(
                {
                    loadingView: true,
                    loadingCompositions: true,
                },
                this.loadView(),
            );
    }
    loadView() {
        const { match } = this.props;
        apiView.viewLoad(match.params.slug).then((view) => {
            view &&
                apiComposition.compositionsLoadByUser(view.id).then((compositions) =>
                    this.setState({
                        loadingCompositions: false,
                        compositions,
                    }),
                );
            this.setState({
                loadingView: false,
                view,
            });
        });
    }
    render() {
        const { profile } = this.props;
        const { view: user, compositions, loadingView, loadingCompositions } = this.state;
        const userName = user && logic.userName(user);
        const item = 'composition';
        const loopComposition = compositions.map((composition, index) => {
            const count = compositions.length - index;
            return (
                <article key={composition.id} id={composition.id} className={`${item} ${item}-${count} node-xs-20`}>
                    <header className="card card-panel">
                        <div className="card-body">
                            <h3 className="composition-title card-headline">{composition.meta.title}</h3>
                            <p className="composition-excerpt">
                                {composition.meta.excerpt}... <Link to={`/${composition.id}`}>View</Link>
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
                        {user ? (
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
};

function mapStateToProps({ profile }) {
    return {
        profile,
    };
}

export default connect(mapStateToProps)(UserView);
