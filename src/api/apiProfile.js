import { users } from './firebase';

class apiProfile {
    // Load
    static profileLoad = (account) =>
        users
            .doc(account.uid)
            .get()
            .then((user) => {
                user.exists ? console.log('Profile:', user.data()) : console.log('No such user!'); // remove
                return user.data();
            })
            .catch((error) => console.error('Error getting user', error)); // remove
}

export default apiProfile;
