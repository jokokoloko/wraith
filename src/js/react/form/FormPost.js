import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionView from '../../redux/action/actionView';
import * as actionPost from '../../redux/action/actionPost';
import { POST_SAVE_REQUEST } from '../../redux/type';
import { POSTS } from '../../data';
import { findByString, removeStatus } from '../../filter';
import { slugify, excerptify } from '../../function';
import * as path from '../../path';
import InputButton from '../input/InputButton';
import InputText from '../input/InputText';
import Loader from '../unit/Loader';

class FormPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingView: true,
            form: {},
            error: {},
        };
        this.isFocus = createRef();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const { history, match, actionView } = this.props;
        match.params.id
            ? actionView.viewLoad(match.params.id, POSTS, true).then((post) => {
                  post.view
                      ? this.setState({
                            loadingView: false,
                        })
                      : history.push(`${path._Private}${path._Post}`);
              })
            : this.setState(
                  {
                      loadingView: false,
                  },
                  () => this.isFocus.current.focus(),
              );
    }
    componentDidUpdate(prevProps) {
        const { match, view } = this.props;
        match.params.id &&
            view !== prevProps.view &&
            this.setState({
                form: view,
            });
    }
    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        const group = target.dataset.group;
        const form = group
            ? {
                  ...this.state.form,
                  [group]: {
                      ...this.state.form[group],
                      [field]: value,
                  },
              }
            : {
                  ...this.state.form,
                  [field]: value,
              };
        this.setState({
            form,
        });
    }
    onSubmit(event) {
        const { history, actionPost } = this.props;
        const { title, content } = this.state.form;
        const slug = slugify(title);
        const excerpt = excerptify(content, 210);
        const form = {
            ...this.state.form,
            slug,
            excerpt,
        };
        event.preventDefault();
        actionPost.postSave(form).then(() => !form.id && history.push(`${path._Private}${path._Post}`));
    }
    render() {
        const { submitting } = this.props;
        const { loadingView, form, error } = this.state;
        const size = 'lg';
        return loadingView ? (
            <Loader position="exact-center fixed" label="Loading view" />
        ) : (
            <form id="form-post" className={`form form-${size}`} onSubmit={this.onSubmit}>
                <div className="row gutter-80">
                    <div className="col-lg">
                        <div className="form-row node-xs-50">
                            <div className="form-column col">
                                <InputText
                                    name="title"
                                    label="Title"
                                    placeholder="Title"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.title}
                                    error={error.title}
                                    reference={this.isFocus}
                                />
                            </div>
                        </div>
                        <div className="form-row node-xs-50">
                            <div className="form-column col">
                                <InputText
                                    type="area"
                                    name="content"
                                    label="Content"
                                    placeholder="Content"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.content}
                                    error={error.content}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card card-panel">
                            <div className="card-body">
                                <h2 className="card-headline">{form.title || 'Title'}</h2>
                                <InputButton
                                    type="submit"
                                    name="save"
                                    label={form.id && submitting ? 'Updating...' : form.id ? 'Update' : submitting ? 'Publishing...' : 'Publish'}
                                    kind={form.id ? 'primary' : 'success'}
                                    size={size}
                                    display="block"
                                    disabled={submitting}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

FormPost.propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    submitting: PropTypes.bool.isRequired,
    view: PropTypes.objectOf(PropTypes.any).isRequired,
    actionView: PropTypes.objectOf(PropTypes.func).isRequired,
    actionPost: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ view, calls }) {
    return {
        submitting: findByString(calls, removeStatus(POST_SAVE_REQUEST)),
        view,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionView: bindActionCreators(actionView, dispatch),
        actionPost: bindActionCreators(actionPost, dispatch),
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormPost),
);
