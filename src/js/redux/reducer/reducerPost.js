import initial from '../initial';
import { POSTS_LOAD_SUCCESS, POSTS_VOID } from '../type';

export default function(state = initial.posts, action) {
    switch (action.type) {
        case POSTS_LOAD_SUCCESS:
            return action.posts || initial.posts;
        case POSTS_VOID:
            return initial.posts;
        default:
            return state;
    }
}
