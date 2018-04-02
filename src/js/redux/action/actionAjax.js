import * as types from '../type';

export const ajaxCallBegin = () => ({
    type: types.AJAX_CALL_BEGIN,
});

export const ajaxCallError = () => ({
    type: types.AJAX_CALL_ERROR,
});
