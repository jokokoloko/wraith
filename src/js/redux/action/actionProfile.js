import toastr from 'toastr';
import apiProfile from '../../../api/apiProfile';
import {
    PROFILE_EDIT_REQUEST,
    PROFILE_EDIT_SUCCESS,
    PROFILE_EDIT_FAILURE,
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

export const profileEditSuccess = (profile) => ({
    type: PROFILE_EDIT_SUCCESS,
    profile,
});

export const profileEditFailure = (error) => ({
    type: PROFILE_EDIT_FAILURE,
    error,
});

export const profileEdit = (profile) => (dispatch) => {
    dispatch(profileEditRequest());
    return apiProfile
        .profileEdit(profile)
        .then(() => {
            dispatch(profileEditSuccess(profile));
            toastr.success('Profile updated!');
        })
        .catch((error) => {
            dispatch(profileEditFailure(error));
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

export const profileLoad = (account) => (dispatch) => {
    dispatch(profileLoadRequest());
    return apiProfile
        .profileLoad(account)
        .then((profile) => {
            dispatch(profileLoadSuccess(profile));
            toastr.success(`Welcome ${profile.name.first ? profile.name.first : profile.email}!`);
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
