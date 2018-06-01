import toastr from 'toastr';
import apiAccount from '../../../api/apiAccount';
import { OFFLINE } from '../../data';
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
import { profileStatus, profileLoad, profileVoid } from './actionProfile';

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
    return apiAccount
        .accountCheck()
        .then((account) => {
            account ? dispatch(profileLoad(account)) : dispatch(profileVoid());
            account ? dispatch(accountOn()) : dispatch(accountOff());
            dispatch(accountCheckSuccess());
        })
        .catch((error) => {
            dispatch(accountCheckFailure(error));
            toastr.error(error.message);
            throw error;
        });
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

export const accountRegister = (account) => (dispatch) => {
    console.log('===== accountRegister BEGIN ====='); // remove
    dispatch(accountRegisterRequest());
    toastr.warning('Registering...'); // possibly remove
    return apiAccount
        .accountRegister(account)
        .then(() => {
            dispatch(accountCheck()); // rework when onAuthStateChanged() is correctly abstracted
            dispatch(accountRegisterSuccess());
            console.log('===== accountRegister END ====='); // remove
        })
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

export const accountLogIn = (account) => (dispatch) => {
    console.log('===== accountLogIn BEGIN ====='); // remove
    dispatch(accountLogInRequest());
    toastr.warning('Logging in...'); // possibly remove
    return apiAccount
        .accountLogIn(account)
        .then(() => {
            dispatch(accountCheck()); // rework when onAuthStateChanged() is correctly abstracted
            dispatch(accountLogInSuccess());
            console.log('===== accountLogIn END ====='); // remove
        })
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

export const accountLogOut = (profile) => (dispatch) => {
    dispatch(accountLogOutRequest());
    return apiAccount
        .accountLogOut()
        .then(() => {
            dispatch(profileStatus(profile.id, OFFLINE));
            dispatch(accountCheck()); // rework when onAuthStateChanged() is correctly abstracted
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

export const accountResetPassword = (account) => (dispatch) => {
    dispatch(accountResetPasswordRequest());
    return apiAccount
        .accountResetPassword(account)
        .then(() => {
            dispatch(accountResetPasswordSuccess());
            toastr.info(`Sent password reset email to ${account.email}`);
        })
        .catch((error) => {
            dispatch(accountResetPasswordFailure(error));
            toastr.error(error.message);
            throw error;
        });
};
