import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionPost from '../../redux/action/actionPost';
import { POST_ADD_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import { slugify, excerptify } from '../../function';
import * as path from '../../path';
import InputButton from '../input/InputButton';
import InputText from '../input/InputText';

class FormPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            error: {},
        };
        this.isFocus = createRef();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const form = {
            ...this.state.form,
            ...this.props.post,
        };
        this.setState({
            form,
        });
        !form.title && this.isFocus.current.focus();
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
        actionPost.postAdd(form).then(() => history.push(`${path._Private}${path._Post}`));
    }
    render() {
        const { submitting } = this.props;
        const { form, error } = this.state;
        const size = 'lg';
        return (
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
                                    label={submitting ? 'Publishing...' : 'Publish'}
                                    kind="success"
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
    submitting: PropTypes.bool.isRequired,
    actionPost: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ calls }) {
    return {
        submitting: findByString(calls, removeStatus(POST_ADD_REQUEST)),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionPost: bindActionCreators(actionPost, dispatch),
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FormPost),
);
