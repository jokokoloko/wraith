import toastr from 'toastr';
import apiPost from '../../../api/apiPost';
import { posts } from '../../../api/firebase';
import {
    POST_ADD_REQUEST,
    POST_ADD_SUCCESS,
    POST_ADD_FAILURE,
    POSTS_LOAD_REQUEST,
    POSTS_LOAD_SUCCESS,
    POSTS_LOAD_FAILURE,
    POSTS_VOID,
} from '../type';

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

// Load
export const postsLoadRequest = () => ({
    type: POSTS_LOAD_REQUEST,
});

export const postsLoadSuccess = (posts) => ({
    type: POSTS_LOAD_SUCCESS,
    posts,
});

export const postsLoadFailure = (error) => ({
    type: POSTS_LOAD_FAILURE,
    error,
});

export const postsLoad = (watch) => (dispatch) => {
    dispatch(postsLoadRequest());
    return watch
        ? posts.onSnapshot(
              (snapshot) => {
                  const posts = snapshot.docs.map((post) => post.data());
                  dispatch(postsLoadSuccess(posts));
              },
              (error) => {
                  dispatch(postsLoadFailure(error));
                  toastr.error(error.message);
                  throw error;
              },
          )
        : apiPost
              .postsLoad()
              .then((posts) => dispatch(postsLoadSuccess(posts)))
              .catch((error) => {
                  dispatch(postsLoadFailure(error));
                  toastr.error(error.message);
                  throw error;
              });
};

// Void
export const postsVoid = () => ({
    type: POSTS_VOID,
});
