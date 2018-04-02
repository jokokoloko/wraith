import toastr from 'toastr';
import { ajaxCallBegin, ajaxCallError } from './actionAjax';
import * as types from '../type';
import apiPost from '../../../api/apiPost';

// View
export const postView = (post) => ({
    type: types.POST_VIEW,
    post,
});

// Vote
export const postLove = (post) => ({
    type: types.POST_LOVE,
    post,
});

export const postHate = (post) => ({
    type: types.POST_HATE,
    post,
});

// Save
export const postAddSuccess = (post) => ({
    type: types.POST_ADD_SUCCESS,
    post,
});

export const postEditSuccess = (post) => ({
    type: types.POST_EDIT_SUCCESS,
    post,
});

export const postSave = (post) => (dispatch) => {
    dispatch(ajaxCallBegin()); // used to display a preloader before calls (optional)
    toastr.warning('Saving Post...'); // possibly remove
    return apiPost
        .postSave(post)
        .then((postSaved) => {
            // function from API (requires return)
            if (post.key) {
                dispatch(postEditSuccess(postSaved));
                toastr.success('Post updated!');
            } else {
                dispatch(postAddSuccess(postSaved));
                toastr.success('Post published!');
            }
        })
        .catch((error) => {
            dispatch(ajaxCallError(error));
            toastr.error(error.message);
            throw error;
        });
};

// Delete
export const postDeleteSuccess = (post) => ({
    type: types.POST_DELETE_SUCCESS,
    post,
});

export const postDelete = (post) => (dispatch) => {
    dispatch(ajaxCallBegin()); // used to display a preloader before calls (optional)
    toastr.warning('Deleting Post...'); // possibly remove
    return apiPost
        .postDelete(post)
        .then(() => {
            // function from API (requires return)
            dispatch(postDeleteSuccess(post));
            toastr.error('Post deleted');
        })
        .catch((error) => {
            dispatch(ajaxCallError(error));
            toastr.error(error.message);
            throw error;
        });
};

// Load
export const postsLoadSuccess = (posts) => ({
    type: types.POSTS_LOAD_SUCCESS,
    posts,
});

export const postsLoad = () =>
    // used in index.js
    (dispatch) => {
        dispatch(ajaxCallBegin()); // used to display a preloader before calls (optional)
        return apiPost
            .postsLoad()
            .then((posts) => {
                // function from API (requires return)
                dispatch(postsLoadSuccess(posts));
            })
            .catch((error) => {
                dispatch(ajaxCallError(error));
                toastr.error(error.message);
                throw error;
            });
    };
