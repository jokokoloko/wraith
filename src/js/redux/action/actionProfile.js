import toastr from 'toastr';
import apiProfile from '../../../api/apiProfile';
import {
    PROFILE_EDIT_REQUEST,
    PROFILE_EDIT_SUCCESS,
    PROFILE_EDIT_FAILURE,
    PROFILE_STATUS_REQUEST,
    PROFILE_STATUS_SUCCESS,
    PROFILE_STATUS_FAILURE,
    PROFILE_LOAD_REQUEST,
    PROFILE_LOAD_SUCCESS,
    PROFILE_LOAD_FAILURE,
    PROFILE_VOID,
} from '../type';

toastr.options.positionClass = 'toast-top-center';

// Edit
export const profileEditRequest = () => ({
    type: PROFILE_EDIT_REQUEST,
});

export const profileEditSuccess = (form) => ({
    type: PROFILE_EDIT_SUCCESS,
    form,
});

export const profileEditFailure = (error) => ({
    type: PROFILE_EDIT_FAILURE,
    error,
});

export const profileEdit = (form) => (dispatch) => {
    dispatch(profileEditRequest());
    return apiProfile
        .profileEdit(form) // issue: check to see if this can return profile in callback function in case writing to firestore fails
        .then(() => {
            dispatch(profileEditSuccess(form)); // issue: pass in profile from firestore api call
            toastr.success('Profile updated!');
        })
        .catch((error) => {
            dispatch(profileEditFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Status
export const profileStatusRequest = () => ({
    type: PROFILE_STATUS_REQUEST,
});

export const profileStatusSuccess = () => ({
    type: PROFILE_STATUS_SUCCESS,
});

export const profileStatusFailure = () => ({
    type: PROFILE_STATUS_FAILURE,
});

export const profileStatus = (status) => (dispatch) => {
    dispatch(profileStatusRequest());
    return apiProfile
        .profileStatus(status)
        .then(() => dispatch(profileStatusSuccess()))
        .catch((error) => {
            dispatch(profileStatusFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Load
export const profileLoadRequest = () => ({
    type: PROFILE_LOAD_REQUEST,
});

export const profileLoadSuccess = (profile) => ({
    type: PROFILE_LOAD_SUCCESS,
    profile,
});

export const profileLoadFailure = (error) => ({
    type: PROFILE_LOAD_FAILURE,
    error,
});

export const profileLoad = () => (dispatch) => {
    dispatch(profileLoadRequest());
    return apiProfile
        .profileLoad()
        .then((profile) => {
            dispatch(profileLoadSuccess(profile));
            toastr.success(`Welcome ${(profile.name && profile.name.first) || profile.email}!`);
        })
        .catch((error) => {
            dispatch(profileLoadFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Void
export const profileVoid = () => ({
    type: PROFILE_VOID,
});
