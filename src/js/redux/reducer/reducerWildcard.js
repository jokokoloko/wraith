import initial from '../initial';
import { WILDCARDS_LOAD_SUCCESS, WILDCARDS_VOID } from '../type';

export default function(state = initial.wildcards, action) {
    switch (action.type) {
        case WILDCARDS_LOAD_SUCCESS:
            return action.wildcards || initial.wildcards;
        case WILDCARDS_VOID:
            return initial.wildcards;
        default:
            return state;
    }
}
