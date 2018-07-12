import toastr from 'toastr';
import apiPost from '../../../api/apiPost';
import { POST_ADD_REQUEST, POST_ADD_SUCCESS, POST_ADD_FAILURE } from '../type';

toastr.options.positionClass = 'toast-top-center';

// Add
export const postAddRequest = () => ({
    type: POST_ADD_REQUEST,
});

export const postAddSuccess = (form) => ({
    type: POST_ADD_SUCCESS,
    form,
});

export const postAddFailure = (error) => ({
    type: POST_ADD_FAILURE,
    error,
});

export const postAdd = (form) => (dispatch) => {
    dispatch(postAddRequest());
    return apiPost
        .postAdd(form)
        .then(() => {
            dispatch(postAddSuccess(form));
            toastr.success('Post published!');
        })
        .catch((error) => {
            dispatch(postAddFailure(error));
            toastr.error(error.message);
            throw error;
        });
};
