import { users } from './firebase';

class apiUser {
    // Load
    static userLoad = (id) =>
        users
            .doc(id)
            .get()
            .then((user) => {
                user.exists ? console.log('User:', user.data()) : console.log('No such user!'); // remove
                return user.data();
            })
            .catch((error) => console.error('Error getting user', error)); // remove

    static usersLoad = () =>
        users
            .get()
            .then((snapshot) => {
                console.log(`Users: ${snapshot.size}`); // remove
                // snapshot.forEach((user) => console.log(user.id, '=>', user.data())); // remove
                return snapshot.docs.map((user) => user.data());
            })
            .catch((error) => console.error('Error getting users:', error)); // remove

    // Watch
    static usersWatch = () =>
        users.onSnapshot(
            (snapshot) => {
                console.log(`Users: ${snapshot.size} (watching)`); // remove
                snapshot.forEach((user) => console.log(user.id, '=>', user.data())); // remove
                return snapshot.docs.map((user) => user.data());
            },
            (error) => console.error('Error getting users:', error), // remove
        );
}

export default apiUser;
