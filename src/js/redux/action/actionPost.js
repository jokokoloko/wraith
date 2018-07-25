import toastr from 'toastr';
import apiPost from '../../../api/apiPost';
import { posts } from '../../../api/firebase';
import {
    POST_ADD,
    POST_EDIT,
    POST_SAVE_REQUEST,
    POST_SAVE_SUCCESS,
    POST_SAVE_FAILURE,
    POSTS_LOAD_REQUEST,
    POSTS_LOAD_SUCCESS,
    POSTS_LOAD_FAILURE,
    POSTS_VOID,
} from '../type';

toastr.options.positionClass = 'toast-top-center';

// Save
export const postAdd = () => ({
    type: POST_ADD,
});

export const postEdit = () => ({
    type: POST_EDIT,
});

export const postSaveRequest = () => ({
    type: POST_SAVE_REQUEST,
});

export const postSaveSuccess = () => ({
    type: POST_SAVE_SUCCESS,
});

export const postSaveFailure = (error) => ({
    type: POST_SAVE_FAILURE,
    error,
});

export const postSave = (form) => (dispatch) => {
    dispatch(postSaveRequest());
    return form.id
        ? apiPost
              .postEdit(form)
              .then(() => {
                  dispatch(postEdit(form));
                  dispatch(postSaveSuccess());
                  toastr.success('Post updated!');
              })
              .catch((error) => {
                  dispatch(postSaveFailure(error));
                  toastr.error(error.message);
                  throw error;
              })
        : apiPost
              .postAdd(form)
              .then(() => {
                  dispatch(postAdd(form));
                  dispatch(postSaveSuccess());
                  toastr.success('Post published!');
              })
              .catch((error) => {
                  dispatch(postSaveFailure(error));
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
        ? posts.orderBy('time.created', 'desc').onSnapshot(
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

export const postsLoadByUser = (user) => (dispatch) => {
    dispatch(postsLoadRequest());
    return apiPost
        .postsLoadByUser(user)
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
