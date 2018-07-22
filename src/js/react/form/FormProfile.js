import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionProfile from '../../redux/action/actionProfile';
import { PROFILE_EDIT_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import { slugify } from '../../function';
import * as client from '../../client';
import * as logic from '../../logic';
import InputButton from '../input/InputButton';
import InputText from '../input/InputText';
import Contact from '../widget/Contact';
import Avatar from '../unit/Avatar';

class FormProfile extends Component {
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
        const { authenticated, profile } = this.props;
        authenticated &&
            this.setState({
                form: profile,
            });
        (!profile.name && this.isFocus.current.focus()) || (profile.name && !profile.name.first && this.isFocus.current.focus());
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
        const { authenticated, profile, actionProfile } = this.props;
        const { name } = this.state.form;
        const slug = (name && name.first && name.last && slugify(`${name.first} ${name.last}`)) || profile.slug;
        const form = {
            ...this.state.form,
            slug,
        };
        event.preventDefault();
        authenticated && actionProfile.profileEdit(form);
    }
    render() {
        const { submitting } = this.props;
        const { form, error } = this.state;
        const size = 'lg';
        return (
            <form id="form-profile" className={`form form-${size}`} onSubmit={this.onSubmit}>
                <div className="row gutter-80">
                    <div className="col-lg">
                        <div className="form-row form-gutter-20">
                            <div className="form-column col-lg">
                                <InputText
                                    name="first"
                                    label="First Name"
                                    placeholder="First Name"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.name && form.name.first}
                                    error={error.first}
                                    group="name"
                                    reference={this.isFocus}
                                />
                            </div>
                            <div className="form-column col-lg">
                                <InputText
                                    name="last"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.name && form.name.last}
                                    error={error.last}
                                    group="name"
                                />
                            </div>
                        </div>
                        <div className="form-row form-gutter-20 node-xs-50">
                            <div className="form-column col-lg">
                                <InputText
                                    name="handle"
                                    label="Handle"
                                    placeholder="Handle"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.handle}
                                    error={error.handle}
                                />
                            </div>
                            <div className="form-column col-lg">
                                <InputText
                                    name="avatar"
                                    label="Avatar"
                                    placeholder="Avatar"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.avatar}
                                    error={error.avatar}
                                />
                            </div>
                        </div>
                        <div className="form-row form-gutter-20 node-xs-50">
                            <div className="form-column col-lg-10">
                                <InputText
                                    name="street"
                                    label="Street"
                                    placeholder="Street"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.address && form.address.street}
                                    error={error.street}
                                    group="address"
                                />
                            </div>
                            <div className="form-column col-lg-2">
                                <InputText
                                    name="unit"
                                    label="Unit"
                                    placeholder="Unit"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.address && form.address.unit}
                                    error={error.unit}
                                    group="address"
                                />
                            </div>
                        </div>
                        <div className="form-row form-gutter-20">
                            <div className="form-column col-lg-4">
                                <InputText
                                    name="city"
                                    label="City"
                                    placeholder="City"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.address && form.address.city}
                                    error={error.city}
                                    group="address"
                                />
                            </div>
                            <div className="form-column col-lg-3">
                                <InputText
                                    name="state"
                                    label="State"
                                    placeholder="State"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.address && form.address.state}
                                    error={error.state}
                                    group="address"
                                />
                            </div>
                            <div className="form-column col-lg-3">
                                <InputText
                                    name="country"
                                    label="Country"
                                    placeholder="Country"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.address && form.address.country}
                                    error={error.country}
                                    group="address"
                                />
                            </div>
                            <div className="form-column col-lg-2">
                                <InputText
                                    name="zip"
                                    label="Zip"
                                    placeholder="Zip"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.address && form.address.zip}
                                    error={error.zip}
                                    group="address"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card card-panel">
                            <div className="card-body">
                                <Avatar
                                    position="fit exact-center"
                                    source={form.avatar || client.EMPTY_AVATAR}
                                    alternate={logic.userNameHandle(form, 'Avatar')}
                                />
                                <h2 className="user-name user-name-first user-name-last card-headline">{logic.userName(form, 'Name')}</h2>
                                <h3 className="user-handle card-tagline">@{form.handle || 'handle'}</h3>
                                <Contact className="user-contact card-meta" item={form} />
                                <InputButton
                                    type="submit"
                                    name="save"
                                    label={submitting ? 'Saving...' : 'Save'}
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

FormProfile.propTypes = {
    submitting: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    actionProfile: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ profile, calls }) {
    return {
        submitting: findByString(calls, removeStatus(PROFILE_EDIT_REQUEST)),
        profile,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionProfile: bindActionCreators(actionProfile, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FormProfile);
