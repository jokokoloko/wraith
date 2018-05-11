import toastr from 'toastr';
import { USERS_LOAD_SUCCESS } from '../type';
import apiUser from '../../../api/apiUser';

toastr.options.positionClass = 'toast-top-center';

// Load
export const usersLoadSuccess = (users) => ({
    type: USERS_LOAD_SUCCESS,
    users,
});

export const usersLoad = (open) => (dispatch) => {
    return apiUser
        .usersLoad(open)
        .then((users) => dispatch(usersLoadSuccess(users)))
        .catch((error) => {
            toastr.error(error.message);
            throw error;
        });
};
