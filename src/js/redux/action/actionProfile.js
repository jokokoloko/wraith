import toastr from 'toastr';
import apiProfile from '../../../api/apiProfile';
import { PROFILE_LOAD_REQUEST, PROFILE_LOAD_SUCCESS, PROFILE_LOAD_FAILURE, PROFILE_VOID } from '../type';

toastr.options.positionClass = 'toast-top-center';

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
            toastr.success(`Welcome ${profile.nameFirst ? profile.nameFirst : profile.email}!`);
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
