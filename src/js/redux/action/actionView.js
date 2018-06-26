import toastr from 'toastr';
import apiView from '../../../api/apiView';
import { VIEW_LOAD_REQUEST, VIEW_LOAD_SUCCESS, VIEW_LOAD_FAILURE, VIEW_VOID } from '../type';

toastr.options.positionClass = 'toast-top-center';

// Load
export const viewLoadRequest = () => ({
    type: VIEW_LOAD_REQUEST,
});

export const viewLoadSuccess = (view) => ({
    type: VIEW_LOAD_SUCCESS,
    view,
});

export const viewLoadFailure = (error) => ({
    type: VIEW_LOAD_FAILURE,
    error,
});

export const viewLoad = (slug, collection) => (dispatch) => {
    dispatch(viewLoadRequest());
    return apiView
        .viewLoad(slug, collection)
        .then((view) => dispatch(viewLoadSuccess(view)))
        .catch((error) => {
            dispatch(viewLoadFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Void
export const viewVoid = () => ({
    type: VIEW_VOID,
});
