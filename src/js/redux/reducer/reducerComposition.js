import initial from '../initial';
import { COMPOSITIONS_LOAD_SUCCESS, COMPOSITIONS_VOID } from '../type';

export default function(state = initial.compositions, action) {
    switch (action.type) {
        case COMPOSITIONS_LOAD_SUCCESS:
            // return [
            //     ...state,
            //     ...action.compositions //|| initial.compositions
            // ];
            return action.compositions || initial.compositions;
        case COMPOSITIONS_VOID:
            return initial.compositions;
        default:
            return state;
    }
}
