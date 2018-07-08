import apiSlug from './apiSlug';
import { authentication, users } from './firebase';
import { generateSlug } from '../js/function';
import { USERS, FRESH, ONLINE, OFFLINE, MEMBER } from '../js/data';

class apiAccount {
    // Register
    static accountRegister = (form) =>
        authentication.createUserWithEmailAndPassword(form.email, form.password).then(() => {
            const slug = generateSlug();
            users
                .doc(authentication.currentUser.uid)
                .set({
                    email: authentication.currentUser.email,
                    id: authentication.currentUser.uid,
                    role: MEMBER,
                    status: FRESH,
                    time: {
                        [ONLINE]: new Date(),
                        created: new Date(),
                    },
                    slug,
                })
                .then(() => {
                    apiSlug.slugAdd(slug, USERS, authentication.currentUser.uid);
                    console.log('Added user:', authentication.currentUser.uid); // remove
                })
                .catch((error) => console.error('Error adding user:', error)); // remove
        });

    // Log In
    static accountLogIn = (form) =>
        authentication.signInWithEmailAndPassword(form.email, form.password).then(
            () =>
                users
                    .doc(authentication.currentUser.uid)
                    .update({
                        status: ONLINE,
                        [`time.${ONLINE}`]: new Date(),
                    })
                    .then(() => console.log('Logged in user with ID:', authentication.currentUser.uid)) // remove
                    .catch((error) => console.error('Error logging in user:', error)), // remove
        );

    // Log Out
    static accountLogOut = () =>
        users
            .doc(authentication.currentUser.uid)
            .update({
                status: OFFLINE,
                [`time.${OFFLINE}`]: new Date(),
            })
            .then(() => authentication.signOut().then(() => console.log('Logged out user.'))) // remove
            .catch((error) => console.error('Error logging out user:', error)); // remove

    // Reset Password
    static accountResetPassword = (form) => authentication.sendPasswordResetEmail(form.email);
}

export default apiAccount;
