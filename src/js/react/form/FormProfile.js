import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMapMarkerAlt from '@fortawesome/fontawesome-pro-regular/faMapMarkerAlt';
import * as actionProfile from '../../redux/action/actionProfile';
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
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        const { form } = this.state;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const object = target.dataset.object;
        object ? (form[object][name] = value) : (form[name] = value);
        this.setState({
            form,
        });
    }
    onSubmit(event) {
        const { actionProfile } = this.props;
        const { form } = this.state;
        event.preventDefault();
        actionProfile.profileEdit(form);
    }
    render() {
        const size = 'lg';
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
                                    object="name"
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
                                    object="name"
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
                                    object="address"
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
                                    object="address"
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
                                    object="address"
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
                                    object="address"
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
                                    object="address"
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
                                    object="address"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card card-panel">
                            <div className="card-body">
                                <Avatar
                                    position="fit"
                                    source={form.avatar ? form.avatar : 'http://via.placeholder.com/800?text=Avatar'}
                                    alternate={
                                        form.name.first && form.name.last
                                            ? `${form.name.first} ${form.name.last}`
                                            : form.name.first
                                                ? `${form.name.first}`
                                                : form.name.last ? `${form.name.last}` : form.handle ? form.handle : 'Avatar'
                                    }
                                />
                                <h2 className="name-full">
                                    {form.name.first && form.name.last
                                        ? `${form.name.first} ${form.name.last}`
                                        : form.name.first ? `${form.name.first}` : form.name.last ? `${form.name.last}` : 'Name'}
                                </h2>
                                <h3 className="handle">@{form.handle ? `${form.handle}` : 'handle'}</h3>
                                <address className="contact" itemType="http://schema.org/Organization" itemScope>
                                    <p
                                        className="address"
                                        itemProp="address"
                                        itemType="http://schema.org/PostalAddress"
                                    itemScope>
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
                                    name="log-in"
                                    label="Save"
                                    kind="success"
                                    size={size}
                                    display="block"
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
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    actionProfile: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ profile }) {
    return {
        profile,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionProfile: bindActionCreators(actionProfile, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormProfile);
