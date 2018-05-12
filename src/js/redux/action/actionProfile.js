import toastr from 'toastr';
import apiProfile from '../../../api/apiProfile';
import { PROFILE_LOAD_SUCCESS } from '../type';

toastr.options.positionClass = 'toast-top-center';

// Load
export const profileLoadSuccess = (profile) => ({
    type: PROFILE_LOAD_SUCCESS,
    profile,
});

export const profileLoad = (account) => (dispatch) => {
    return apiProfile
        .profileLoad(account)
        .then(
            (profile) =>
                profile &&
                dispatch(profileLoadSuccess(profile)) &&
                toastr.success(`Welcome ${profile.nameFirst ? profile.nameFirst : profile.email}!`),
        )
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });
};
