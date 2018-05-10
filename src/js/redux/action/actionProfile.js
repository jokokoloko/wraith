import toastr from 'toastr';
import { callBegin, callError } from './actionCall';
import { PROFILE_LOAD_SUCCESS } from '../type';
import apiProfile from '../../../api/apiProfile';

toastr.options.positionClass = 'toast-top-center';

// Load
export const profileLoadSuccess = (profile) => ({
    type: PROFILE_LOAD_SUCCESS,
    profile,
});

export const profileLoad = (account) => (dispatch) => {
    dispatch(callBegin());
    return apiProfile
        .profileLoad(account)
        .then(
            (profile) =>
                profile &&
                dispatch(profileLoadSuccess(profile)) &&
                toastr.success(`Welcome ${profile.nameFirst ? profile.nameFirst : profile.email}!`),
        )
        .catch((error) => {
            dispatch(callError(error));
            toastr.error(error.message);
            throw error;
        });
};
