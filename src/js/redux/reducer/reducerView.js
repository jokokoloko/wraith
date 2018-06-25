import initial from '../initial';
import { VIEW_LOAD_SUCCESS, VIEW_VOID } from '../type';

export default function reducerView(state = initial.view, action) {
    switch (action.type) {
        case VIEW_LOAD_SUCCESS:
            return action.view || initial.view;
        case VIEW_VOID:
            return initial.view;
        default:
            return state;
    }
}
