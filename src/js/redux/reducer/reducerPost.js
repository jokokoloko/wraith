import initial from '../initial';
import { POST_VIEW, POST_LOVE, POST_HATE, POST_ADD_SUCCESS, POST_EDIT_SUCCESS, POST_DELETE_SUCCESS, POSTS_LOAD_SUCCESS } from '../type';
import { findIndexByKey } from '../../filter';

export default function reducerPost(state = initial.posts, action) {
    switch (action.type) {
        case POST_VIEW: {
            const index = findIndexByKey(state, action.post.key);
            return [
                ...state.slice(0, index),
                Object.assign({}, action.post, {
                    view: action.post.view + 1,
                }),
                ...state.slice(index + 1),
            ];
        }
        case POST_LOVE: {
            const index = findIndexByKey(state, action.post.key);
            return [
                ...state.slice(0, index),
                Object.assign({}, action.post, {
                    love: action.post.love + 1,
                }),
                ...state.slice(index + 1),
            ];
        }
        case POST_HATE: {
            const index = findIndexByKey(state, action.post.key);
            return [
                ...state.slice(0, index),
                Object.assign({}, action.post, {
                    hate: action.post.hate + 1,
                }),
                ...state.slice(index + 1),
            ];
        }
        case POST_ADD_SUCCESS:
            return [...state, Object.assign({}, action.post)];
        case POST_EDIT_SUCCESS: {
            const index = findIndexByKey(state, action.post.key);
            return [...state.slice(0, index), Object.assign({}, action.post), ...state.slice(index + 1)];
        }
        case POST_DELETE_SUCCESS: {
            const index = findIndexByKey(state, action.post.key);
            return [...state.slice(0, index), ...state.slice(index + 1)];
        }
        case POSTS_LOAD_SUCCESS:
            return action.posts;
        default:
            return state;
    }
}
