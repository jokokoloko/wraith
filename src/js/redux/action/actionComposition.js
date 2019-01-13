import toastr from 'toastr';
import apiComposition from '../../../api/apiComposition';
import { compositions } from '../../../api/firebase';
import {
    COMPOSITION_ADD,
    COMPOSITION_EDIT,
    COMPOSITION_SAVE_REQUEST,
    COMPOSITION_SAVE_SUCCESS,
    COMPOSITION_SAVE_FAILURE,
    COMPOSITIONS_LOAD_REQUEST,
    COMPOSITIONS_LOAD_SUCCESS,
    COMPOSITIONS_LOAD_FAILURE,
    COMPOSITIONS_VOID,
} from '../type';

toastr.options.positionClass = 'toast-top-center';

// Save
export const compositionAdd = () => ({
    type: COMPOSITION_ADD,
});

export const compositionEdit = () => ({
    type: COMPOSITION_EDIT,
});

export const compositionSaveRequest = () => ({
    type: COMPOSITION_SAVE_REQUEST,
});

export const compositionSaveSuccess = () => ({
    type: COMPOSITION_SAVE_SUCCESS,
});

export const compositionSaveFailure = (error) => ({
    type: COMPOSITION_SAVE_FAILURE,
    error,
});

export const compositionSave = (data) => (dispatch) => {
    dispatch(compositionSaveRequest());
    return data.id
        ? apiComposition
              .compositionEdit(data)
              .then(() => {
                  dispatch(compositionEdit());
                  dispatch(compositionSaveSuccess());
                  toastr.success('Composition updated!');
              })
              .catch((error) => {
                  dispatch(compositionSaveFailure(error));
                  toastr.error(error.message);
                  throw error;
              })
        : apiComposition
              .compositionAdd(data)
              .then((composition) => {
                  dispatch(compositionAdd());
                  dispatch(compositionSaveSuccess());
                  toastr.success('Composition published!');
                  return composition;
              })
              .catch((error) => {
                  dispatch(compositionSaveFailure(error));
                  toastr.error(error.message);
                  throw error;
              });
};

// Load
export const compositionsLoadRequest = () => ({
    type: COMPOSITIONS_LOAD_REQUEST,
});

export const compositionsLoadSuccess = (compositions) => ({
    type: COMPOSITIONS_LOAD_SUCCESS,
    compositions,
});

export const compositionsLoadFailure = (error) => ({
    type: COMPOSITIONS_LOAD_FAILURE,
    error,
});

export const compositionsLoad = (watch) => (dispatch) => {
    dispatch(compositionsLoadRequest());
    return watch
        ? compositions.orderBy('time.created', 'desc').onSnapshot(
              (snapshot) => {
                  const compositions = snapshot.docs.map((composition) => composition.data());
                  dispatch(compositionsLoadSuccess(compositions));
              },
              (error) => {
                  dispatch(compositionsLoadFailure(error));
                  toastr.error(error.message);
                  throw error;
              },
          )
        : apiComposition
              .compositionsLoad()
              .then((compositions) => dispatch(compositionsLoadSuccess(compositions)))
              .catch((error) => {
                  dispatch(compositionsLoadFailure(error));
                  toastr.error(error.message);
                  throw error;
              });
};

export const compositionsLoadByUser = (user) => (dispatch) => {
    dispatch(compositionsLoadRequest());
    return apiComposition
        .compositionsLoadByUser(user)
        .then((compositions) => dispatch(compositionsLoadSuccess(compositions)))
        .catch((error) => {
            dispatch(compositionsLoadFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

//order -> either "asc" or "desc"
//limit -> number of items to get.
//startAfterDoc -> a document snapshot that serves as point of reference for pagination.
export const compositionsLoadByTime = (order, limit, startAfterDoc) => (dispatch) => {
    dispatch(compositionsLoadRequest());
    return apiComposition
        .compositionsLoadByTime(order, limit, startAfterDoc)
        .then((compositions) => {
            console.log("my comp now", compositions);
            return dispatch(compositionsLoadSuccess(compositions));
        })
        .catch((error) => {
            dispatch(compositionsLoadFailure(error));
            toastr.error(error.message);
            throw error;
        });
};

// Void
export const compositionsVoid = () => ({
    type: COMPOSITIONS_VOID,
});
