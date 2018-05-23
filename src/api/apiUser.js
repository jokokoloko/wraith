import { users } from './firebase';
import { usersWatchSuccess, usersWatchError } from '../js/redux/action/actionUser';

class apiUser {
    // Load
    static usersLoad = (open) =>
        users
            .get()
            .then((snapshot) => {
                console.log(`Users: ${snapshot.size}`); // remove
                snapshot.forEach((user) => console.log(user.id, '=>', user.data())); // remove
                return snapshot.docs.map((user) => (open ? user.data() : { id: user.id }));
            })
            .catch((error) => console.error('Error getting users:', error)); // remove

    // Watch
    static usersWatch = (dispatch) =>
        users.onSnapshot(
            (snapshot) => {
                const users = snapshot.docs.map((user) => user.data());
                dispatch(usersWatchSuccess(users));
            },
            (error) => {
                dispatch(usersWatchError(error));
                console.error('Error getting users:', error); // remove
            },
        );
}

export default apiUser;
