import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMapMarkerAlt from '@fortawesome/fontawesome-pro-regular/faMapMarkerAlt';
import * as actionProfile from '../../redux/action/actionProfile';
import { PROFILE_EDIT_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import { slugify } from '../../function';
import InputButton from '../input/InputButton';
import InputText from '../input/InputText';
import Avatar from '../unit/Avatar';

class FormProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: {},
                address: {},
            },
            error: {},
        };
        this.isFocus = createRef();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const form = {
            ...this.state.form,
            ...this.props.profile,
        };
        this.setState({
            form,
        });
        !form.name.first && this.isFocus.current.focus();
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
        const { profile, actionProfile } = this.props;
        const { name } = this.state.form;
        const slug = name.first && name.last ? slugify(`${name.first} ${name.last}`) : profile.slug;
        const form = {
            ...this.state.form,
            time: {
                ...this.state.form.time,
                edited: new Date(),
            },
            slug,
        };
        event.preventDefault();
        actionProfile.profileEdit(form);
    }
    render() {
        const size = 'lg';
        const { submitting } = this.props;
        const { form, error } = this.state;
        return (
            <form id="form-profile" className={`form form-${size} mx-lg-auto`} onSubmit={this.onSubmit}>
                <div className="row gutter-lg-80">
                    <div className="col-lg-9">
                        <div className="form-row form-gutter-20">
                            <div className="form-column col-lg">
                                <InputText
                                    name="first"
                                    label="First Name"
                                    placeholder="First Name"
                                    size={size}
                                    onChange={this.onChange}
                                    value={form.name.first}
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
                                    value={form.name.last}
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
                                    value={form.address.street}
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
                                    value={form.address.unit}
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
                                    value={form.address.city}
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
                                    value={form.address.state}
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
                                    value={form.address.country}
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
                                    value={form.address.zip}
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
                                    source={form.avatar ? form.avatar : 'http://via.placeholder.com/800?text=Avatar'}
                                    alternate={
                                        form.name.first && form.name.last
                                            ? `${form.name.first} ${form.name.last}`
                                            : form.name.first
                                                ? `${form.name.first}`
                                                : form.name.last
                                                    ? `${form.name.last}`
                                                    : form.handle
                                                        ? form.handle
                                                        : 'Avatar'
                                    }
                                />
                                <h2 className="name-full">
                                    {form.name.first && form.name.last
                                        ? `${form.name.first} ${form.name.last}`
                                        : form.name.first
                                            ? `${form.name.first}`
                                            : form.name.last
                                                ? `${form.name.last}`
                                                : 'Name'}
                                </h2>
                                <h3 className="handle">@{form.handle ? `${form.handle}` : 'handle'}</h3>
                                <address className="contact" itemType="http://schema.org/Organization" itemScope>
                                    <p className="address" itemProp="address" itemType="http://schema.org/PostalAddress" itemScope>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {form.address.city && form.address.state && form.address.country ? (
                                            <Fragment>
                                                <span itemProp="addressLocality">{form.address.city}</span>
                                                {', '}
                                                <span itemProp="addressRegion">{form.address.state}</span>
                                                {', '}
                                                <span itemProp="addressCountry">{form.address.country}</span>
                                            </Fragment>
                                        ) : form.address.city && form.address.state ? (
                                            <Fragment>
                                                <span itemProp="addressLocality">{form.address.city}</span>
                                                {', '}
                                                <span itemProp="addressRegion">{form.address.state}</span>
                                            </Fragment>
                                        ) : form.address.city && form.address.country ? (
                                            <Fragment>
                                                <span itemProp="addressLocality">{form.address.city}</span>
                                                {', '}
                                                <span itemProp="addressCountry">{form.address.country}</span>
                                            </Fragment>
                                        ) : form.address.state && form.address.country ? (
                                            <Fragment>
                                                <span itemProp="addressRegion">{form.address.state}</span>
                                                {', '}
                                                <span itemProp="addressCountry">{form.address.country}</span>
                                            </Fragment>
                                        ) : form.address.city ? (
                                            <span itemProp="addressLocality">{form.address.city}</span>
                                        ) : form.address.state ? (
                                            <span itemProp="addressRegion">{form.address.state}</span>
                                        ) : form.address.country ? (
                                            <span itemProp="addressCountry">{form.address.country}</span>
                                        ) : (
                                            'Location'
                                        )}
                                    </p>
                                </address>
                                <InputButton
                                    type="submit"
                                    name="save"
                                    label={submitting ? 'Saving...' : 'Save'}
                                    kind="success"
                                    size={size}
                                    display="block"
                                    submitting={submitting}
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
