import { authentication, users } from './firebase';

class apiProfile {
    // Edit
    static profileEdit = (profile) => users.doc(authentication.currentUser.uid).update(profile);

    // Status
    static profileStatus = (status) =>
        users.doc(authentication.currentUser.uid).update({
            [`time.${status}`]: new Date(),
            status,
        });

    // Load
    static profileLoad = () =>
        users
            .doc(authentication.currentUser.uid)
            .get()
            .then((user) => {
                user.exists ? console.log('Profile:', user.data()) : console.log('No such user!'); // remove
                return user.data();
            })
            .catch((error) => console.error('Error getting user', error)); // remove
}

export default apiProfile;
