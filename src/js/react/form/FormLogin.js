import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionAccount from '../../redux/action/actionAccount';
import InputButton from '../input/InputButton';
import InputText from '../input/InputText';

class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            errors: {},
            status: false,
        };
        this.onResetPassword = this.onResetPassword.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onResetPassword() {
        const { actionAccount } = this.props;
        const { account } = this.state;
        actionAccount.accountResetPassword(account);
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
        const { actionAccount } = this.props;
        const { account } = this.state;
        event.preventDefault();
        if (!this.isValid()) {
            return;
        }
        this.setState({
            status: true,
        });
        actionAccount.accountLogIn(account).catch((error) => {
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
            <form id="form-login" className={`form form-${size} mx-lg-auto`} onSubmit={this.onSubmit}>
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
                <div className="form-row">
                    <div className="form-column col-lg">
                        <div className="form-group">
                            <InputButton
                                type="submit"
                                name="log-in"
                                label={status ? 'Logging in...' : 'Log In'}
                                kind="primary"
                                size={size}
                                display="block"
                                status={status}
                            />
                        </div>
                    </div>
                    <div className="form-column col-lg">
                        <div className="form-group text-right">
                            <InputButton
                                type="button"
                                name="reset-password"
                                label="Forgot Password?"
                                kind="link"
                                size={size}
                                display="block"
                                onClick={this.onResetPassword}
                            />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

FormLogin.propTypes = {
    actionAccount: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actionAccount: bindActionCreators(actionAccount, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(FormLogin);
