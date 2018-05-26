import React, { Component } from 'react';
import InputText from '../input/InputText';

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
    render() {
        const size = 'lg';
        const { form, error } = this.state;
        return (
            <form id="form-profile" className={`form form-${size} mx-lg-auto`}>
                <InputText
                    name="handle"
                    label="Handle"
                    placeholder="Handle"
                    size={size}
                    onChange={this.onChange}
                    value={form.handle}
                    error={error.handle}
                />
                <InputText
                    name="alias"
                    label="Alias"
                    placeholder="Alias"
                    size={size}
                    onChange={this.onChange}
                    value={form.alias}
                    error={error.alias}
                />
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
            </form>
        );
    }
}

export default FormProfile;
