import { users } from './firebase';

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
    static usersWatch = () =>
        new Promise((resolve, reject) =>
            users.onSnapshot(
                (snapshot) => {
                    console.log(`Users: ${snapshot.size} (watching)`); // remove
                    snapshot.forEach((user) => console.log(user.id, '=>', user.data())); // remove
                    resolve(snapshot.docs.map((user) => user.data()));
                },
                (error) => reject(error),
            ),
        );
}

export default apiUser;
