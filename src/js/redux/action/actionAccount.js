import toastr from 'toastr';
import apiAccount from '../../../api/apiAccount';
import { ACCOUNT_ON, ACCOUNT_OFF, ACCOUNT_CHECK_REQUEST, ACCOUNT_CHECK_SUCCESS, ACCOUNT_CHECK_FAILURE } from '../type';
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
export const accountRegister = (account) => (dispatch) => {
    toastr.warning('Registering...'); // possibly remove
    return apiAccount
        .accountRegister(account)
        .then(() => dispatch(accountCheck())) // rework when onAuthStateChanged() is correctly abstracted
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });
};

// Log In
export const accountLogIn = (account) => (dispatch) => {
    toastr.warning('Logging in...'); // possibly remove
    return apiAccount
        .accountLogIn(account)
        .then(() => dispatch(accountCheck())) // rework when onAuthStateChanged() is correctly abstracted
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });
};

// Log Out
export const accountLogOut = () => (dispatch) =>
    apiAccount
        .accountLogOut()
        .then(() => {
            dispatch(accountCheck()); // rework when onAuthStateChanged() is correctly abstracted
            toastr.info('Logout successful.');
        })
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });

// Reset Password
export const accountResetPassword = (account) => (dispatch) =>
    apiAccount
        .accountResetPassword(account)
        .then(() => toastr.info(`Sent password reset email to ${account.email}`))
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });
