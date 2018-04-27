import { CALL_BEGIN, CALL_ERROR } from '../type';

export const callBegin = () => ({
    type: CALL_BEGIN,
});

export const callError = () => ({
    type: CALL_ERROR,
});
