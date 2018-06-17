import toastr from 'toastr';
// import apiComposition from '../../../api/apiComposition';
// import { composition } from '../../../api/firebase';
import {
    COMPOSITION_LOAD_REQUEST,
    COMPOSITION_LOAD_SUCCESS,
    COMPOSITION_LOAD_FAILURE,
    COMPOSITION_BUILD_REQUEST,
    COMPOSITION_BUILD_SUCCESS,
    COMPOSITION_BUILD_FAILURE,
    COMPOSITION_WATCH_REQUEST,
    COMPOSITION_WATCH_SUCCESS,
    COMPOSITION_WATCH_FAILURE,
    COMPOSITION_VOID,
} from '../type';

toastr.options.positionClass = 'toast-top-center';
export const compositionBuildSuccess = (composition) => ({
    type: COMPOSITION_BUILD_SUCCESS,
    composition,
});

export const compositionBuild = (composition) => (dispatch) => {
    dispatch(compositionBuildSuccess(composition));
};

// // Load
// export const compositionLoadRequest = () => ({
//     type: COMPOSITION_LOAD_REQUEST,
// });

// export const compositionLoadSuccess = (composition) => ({
//     type: COMPOSITION_LOAD_SUCCESS,
//     composition,
// });

// export const compositionLoadFailure = (error) => ({
//     type: COMPOSITION_LOAD_FAILURE,
//     error,
// });

// export const compositionLoad = (open) => (dispatch) => {
//     dispatch(compositionLoadRequest());
//     return apiUser
//         .compositionLoad(open)
//         .then((composition) => dispatch(compositionLoadSuccess(composition)))
//         .catch((error) => {
//             dispatch(compositionLoadFailure(error));
//             toastr.error(error.message);
//             throw error;
//         });
// };

// // Watch
// export const compositionWatchRequest = () => ({
//     type: COMPOSITION_WATCH_REQUEST,
// });

// export const compositionWatchSuccess = (composition) => ({
//     type: COMPOSITION_WATCH_SUCCESS,
//     composition,
// });

// export const compositionWatchFailure = (error) => ({
//     type: COMPOSITION_WATCH_FAILURE,
//     error,
// });

// export const compositionWatch = (open) => (dispatch) => {
//     dispatch(compositionWatchRequest());
//     return composition.onSnapshot(
//         (snapshot) => {
//             const composition = snapshot.docs.map((composition) => (open ? composition.data() : { id: composition.id }));
//             dispatch(compositionWatchSuccess(composition));
//         },
//         (error) => {
//             dispatch(compositionWatchFailure(error));
//             toastr.error(error.message);
//             throw error;
//         },
//     );
// };

// Void
export const compositionVoid = () => ({
    type: COMPOSITION_VOID,
});
