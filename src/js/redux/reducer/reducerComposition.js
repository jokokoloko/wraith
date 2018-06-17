import initial from '../initial';
import { COMPOSITION_LOAD_SUCCESS, COMPOSITION_WATCH_SUCCESS, COMPOSITION_BUILD_SUCCESS, COMPOSITION_VOID } from '../type';

export default function reducerComposition(state = initial.composition, action) {
    switch (action.type) {
        case COMPOSITION_BUILD_SUCCESS:
        case COMPOSITION_LOAD_SUCCESS:
        case COMPOSITION_WATCH_SUCCESS:
            return action.composition;
        case COMPOSITION_VOID:
            return initial.composition;
        default:
            return state;
    }
}