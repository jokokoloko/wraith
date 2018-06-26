import apiSlug from './apiSlug';
import { authentication, users } from './firebase';
import { USERS } from '../js/data';

class apiProfile {
    // Edit
    static profileEdit = (profile) =>
        users
            .doc(authentication.currentUser.uid)
            .update(profile)
            .then(() => apiSlug.slugAdd(profile.slug, USERS, authentication.currentUser.uid))
            .catch((error) => console.error('Error updating profile', error)); // remove

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
