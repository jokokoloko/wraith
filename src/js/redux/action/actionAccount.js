import toastr from 'toastr';
import apiAccount from '../../../api/apiAccount';
import { authentication } from '../../../api/firebase';
import {
    ACCOUNT_ON,
    ACCOUNT_OFF,
    ACCOUNT_CHECK_REQUEST,
    ACCOUNT_CHECK_SUCCESS,
    ACCOUNT_CHECK_FAILURE,
    ACCOUNT_REGISTER_REQUEST,
    ACCOUNT_REGISTER_SUCCESS,
    ACCOUNT_REGISTER_FAILURE,
    ACCOUNT_LOG_IN_REQUEST,
    ACCOUNT_LOG_IN_SUCCESS,
    ACCOUNT_LOG_IN_FAILURE,
    ACCOUNT_LOG_OUT_REQUEST,
    ACCOUNT_LOG_OUT_SUCCESS,
    ACCOUNT_LOG_OUT_FAILURE,
    ACCOUNT_RESET_PASSWORD_REQUEST,
    ACCOUNT_RESET_PASSWORD_SUCCESS,
    ACCOUNT_RESET_PASSWORD_FAILURE,
} from '../type';
import { profileLoad, profileVoid } from './actionProfile';

toastr.options.positionClass = 'toast-top-center';

// Check
export const accountOn = () => ({
    type: ACCOUNT_ON,
});

export const accountOff = () => ({
    type: ACCOUNT_OFF,
});

export const accountCheckRequest = () => ({
    type: ACCOUNT_CHECK_REQUEST,
});

export const accountCheckSuccess = () => ({
    type: ACCOUNT_CHECK_SUCCESS,
});

export const accountCheckFailure = (error) => ({
    type: ACCOUNT_CHECK_FAILURE,
    error,
});

export const accountCheck = () => (dispatch) => {
    dispatch(accountCheckRequest());
    return authentication.onAuthStateChanged(
        (account) => {
            if (account) {
                dispatch(profileLoad());
                dispatch(accountOn());
                console.log(`Account: ${account.email}`); // remove
            } else {
                dispatch(profileVoid());
                dispatch(accountOff());
                console.log('Account: guest'); // remove
            }
            dispatch(accountCheckSuccess());
        },
        (error) => {
            dispatch(accountCheckFailure(error));
            toastr.error(error.message);
            throw error;
        },
    );
};

// Register
export const accountRegisterRequest = () => ({
    type: ACCOUNT_REGISTER_REQUEST,
});

export const accountRegisterSuccess = () => ({
    type: ACCOUNT_REGISTER_SUCCESS,
});

export const accountRegisterFailure = (error) => ({
    type: ACCOUNT_REGISTER_FAILURE,
    error,
});

export const accountRegister = (form) => (dispatch) => {
    dispatch(accountRegisterRequest());
    toastr.warning('Registering...'); // possibly remove
    return apiAccount
        .accountRegister(form)
        .then(() => dispatch(accountRegisterSuccess()))
        .catch((error) => {
            dispatch(accountRegisterFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Log In
export const accountLogInRequest = () => ({
    type: ACCOUNT_LOG_IN_REQUEST,
});

export const accountLogInSuccess = () => ({
    type: ACCOUNT_LOG_IN_SUCCESS,
});

export const accountLogInFailure = (error) => ({
    type: ACCOUNT_LOG_IN_FAILURE,
    error,
});

export const accountLogIn = (form) => (dispatch) => {
    dispatch(accountLogInRequest());
    toastr.warning('Logging in...'); // possibly remove
    return apiAccount
        .accountLogIn(form)
        .then(() => dispatch(accountLogInSuccess()))
        .catch((error) => {
            dispatch(accountLogInFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Log Out
export const accountLogOutRequest = () => ({
    type: ACCOUNT_LOG_OUT_REQUEST,
});

export const accountLogOutSuccess = () => ({
    type: ACCOUNT_LOG_OUT_SUCCESS,
});

export const accountLogOutFailure = (error) => ({
    type: ACCOUNT_LOG_OUT_FAILURE,
    error,
});

export const accountLogOut = () => (dispatch) => {
    dispatch(accountLogOutRequest());
    return apiAccount
        .accountLogOut()
        .then(() => {
            dispatch(accountLogOutSuccess());
            toastr.info('Logout successful.');
        })
        .catch((error) => {
            dispatch(accountLogOutFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Reset Password
export const accountResetPasswordRequest = () => ({
    type: ACCOUNT_RESET_PASSWORD_REQUEST,
});

export const accountResetPasswordSuccess = () => ({
    type: ACCOUNT_RESET_PASSWORD_SUCCESS,
});

export const accountResetPasswordFailure = (error) => ({
    type: ACCOUNT_RESET_PASSWORD_FAILURE,
    error,
});

export const accountResetPassword = (form) => (dispatch) => {
    dispatch(accountResetPasswordRequest());
    return apiAccount
        .accountResetPassword(form)
        .then(() => {
            dispatch(accountResetPasswordSuccess());
            toastr.info(`Sent password reset email to ${form.email}`);
        })
        .catch((error) => {
            dispatch(accountResetPasswordFailure(error));
            toastr.error(error.message);
            throw error;
        });
};
