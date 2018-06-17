import initial from '../initial';
import { CHAMPIONS_LOAD_SUCCESS, CHAMPIONS_WATCH_SUCCESS, CHAMPIONS_VOID } from '../type';

export default function reducerChampion(state = initial.champions, action) {
	switch (action.type) {
		case CHAMPIONS_LOAD_SUCCESS:
		case CHAMPIONS_WATCH_SUCCESS:
			return action.champions;
		case CHAMPIONS_VOID:
			return initial.champions;
		default:
			return state;
	}
}