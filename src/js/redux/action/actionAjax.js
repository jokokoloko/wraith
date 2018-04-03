import { AJAX_CALL_BEGIN, AJAX_CALL_ERROR } from '../type';

export const ajaxCallBegin = () => ({
    type: AJAX_CALL_BEGIN,
});

export const ajaxCallError = () => ({
    type: AJAX_CALL_ERROR,
});
