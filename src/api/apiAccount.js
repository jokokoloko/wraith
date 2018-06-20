import { authentication, users } from './firebase';
import { generateID } from '../js/function';
import { FRESH, ONLINE, OFFLINE, MEMBER } from '../js/data';

class apiAccount {
    // Register
    static accountRegister = (account) =>
        authentication.createUserWithEmailAndPassword(account.email, account.password).then(
            () =>
                users
                    .doc(authentication.currentUser.uid)
                    .set({
                        email: authentication.currentUser.email,
                        id: authentication.currentUser.uid,
                        slug: generateID(authentication.currentUser.uid).toLowerCase(),
                        role: MEMBER,
                        status: FRESH,
                        time: {
                            [ONLINE]: new Date(),
                            created: new Date(),
                        },
                    })
                    .then(() => console.log('Added user with ID:', authentication.currentUser.uid)) // remove
                    .catch((error) => console.error('Error adding user:', error)), // remove
        );

    // Log In
    static accountLogIn = (account) =>
        authentication.signInWithEmailAndPassword(account.email, account.password).then(
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
    static accountResetPassword = (account) => authentication.sendPasswordResetEmail(account.email);
}

export default apiAccount;
