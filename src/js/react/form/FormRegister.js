import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../redux/action/actionAccount';
import InputAction from '../input/InputAction';
import InputText from '../input/InputText';

class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {
                email: '',
                password: '',
            },
            errors: {},
            status: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        const { account } = this.state;
        const target = event.target;
        const input = target.name;
        account[input] = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            account,
        });
    }
    onSubmit(event) {
        const { account } = this.state;
        event.preventDefault();
        if (!this.isValid()) {
            return;
        }
        this.setState({
            status: true,
        });
        this.props.actions.accountRegister(account).catch((error) => {
            this.setState({
                status: false,
            });
            throw error;
        });
    }
    isValid() {
        const { account } = this.state;
        const errors = {};
        const emailLength = 5;
        const passwordLength = 5;
        let valid = true;
        if (account.email === undefined || account.email.length < emailLength) {
            errors.email = `Email must be at least ${emailLength} characters.`;
            valid = false;
        }
        if (account.password === undefined || account.password.length < passwordLength) {
            errors.password = `Password must be at least ${passwordLength} characters.`;
            valid = false;
        }
        this.setState({
            errors,
        });
        return valid;
    }
    render() {
        const size = 'lg';
        const { account, errors, status } = this.state;
        return (
            <form id="form-register" className={`form form-${size} mx-lg-auto`} onSubmit={this.onSubmit}>
                <InputText
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    size={size}
                    onChange={this.onChange}
                    value={account.email}
                    error={errors.email}
                />
                <InputText
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    size={size}
                    onChange={this.onChange}
                    value={account.password}
                    error={errors.password}
                />
                <div className="form-group">
                    <InputAction
                        type="submit"
                        name="register"
                        action={status ? 'Registering...' : 'Register'}
                        kind="success"
                        size={size}
                        display="block"
                        status={status}
                    />
                </div>
            </form>
        );
    }
}

FormRegister.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(FormRegister);
