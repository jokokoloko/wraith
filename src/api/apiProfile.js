import apiSlug from './apiSlug';
import { authentication, users } from './firebase';
import { USERS } from '../js/data';

class apiProfile {
    // Edit
    static profileEdit = (form) =>
        authentication.currentUser.uid === form.id &&
        users
            .doc(authentication.currentUser.uid)
            .update({
                ...form,
                'time.edited': new Date(),
            })
            .then(() => {
                apiSlug.slugAdd(form.slug, USERS, authentication.currentUser.uid);
                console.log('Edited profile:', authentication.currentUser.uid); // remove
            })
            .catch((error) => console.error('Error editing profile:', error)); // remove

    // Author
    static profileAuthor = (collection, reference, batch = null) => {
        if (authentication.currentUser) {
            let userRef = users.doc(authentication.currentUser.uid);
            let updatedData = {
                [`${collection}.${reference}`]: new Date(),
                'time.authored': new Date(),
            };
            if (batch) {
                batch.update(userRef, updatedData);
            } else {
                return userRef
                    .update(updatedData)
                    .then(() => console.log(`Authored a new document in ${collection}:`, reference)) // remove
                    .catch((error) => console.error(`Error authoring a new document in ${collection}:`, error)); // remove
            }
        }
    };

    // Status
    static profileStatus = (status) =>
        authentication.currentUser &&
        users.doc(authentication.currentUser.uid).update({
            [`time.${status}`]: new Date(),
            status,
        });

    // Load
    static profileLoad = () =>
        authentication.currentUser &&
        users
            .doc(authentication.currentUser.uid)
            .get()
            .then((user) => {
                user.exists ? console.log('Profile:', user.data()) : console.log('No such user!'); // remove
                return user.data();
            })
            .catch((error) => console.error('Error getting user:', error)); // remove
}

export default apiProfile;
