import { users } from './firebase';
import { usersWatchDispatch } from '../js/redux/action/actionUser';

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
                console.log(`Users: ${snapshot.size} (watching)`);
                const users = snapshot.docs.map((user) => user.data());
                console.log('users in here', users);
                dispatch(usersWatchDispatch(users));
            },
            (error) => console.error('Error getting users:', error), // remove
        );
}

export default apiUser;
