import { authentication, users } from './firebase';
import { generateID } from '../js/function';
import { FRESH, ONLINE, OFFLINE } from '../js/data';

class apiAccount {
    // Check
    static accountCheck = () =>
        new Promise((resolve, reject) => {
            const unsubscribe = authentication.onAuthStateChanged(
                (account) => {
                    unsubscribe(); // this shouldn't be run during registering, logging in, and logging out.
                    resolve(account);
                    account
                        ? console.log(`Account: ${account.email}`) // this shouldn't run twice when unsubscribe() is removed
                        : console.log('Account: guest'); // this shouldn't run twice when unsubscribe() is removed
                },
                (error) => reject(error),
            );
            console.log('Account checked.'); // remove
        });

    // Register
    static accountRegister = (account) =>
        authentication.createUserWithEmailAndPassword(account.email, account.password).then(
            (account) =>
                users
                    .doc(account.uid)
                    .set({
                        email: account.email,
                        id: account.uid,
                        slug: generateID(account.uid).toLowerCase(),
                        status: FRESH,
                        time: {
                            [ONLINE]: new Date(),
                            created: new Date(),
                        },
                    })
                    .then(() => console.log('Added user with ID:', account.uid)) // remove
                    .catch((error) => console.error('Error adding user:', error)), // remove
        );

    // Reset Password
    static accountResetPassword = (account) => authentication.sendPasswordResetEmail(account.email);

    // Log In
    static accountLogIn = (account) =>
        authentication.signInWithEmailAndPassword(account.email, account.password).then(
            (account) =>
                users
                    .doc(account.uid)
                    .update({
                        status: ONLINE,
                        [`time.${ONLINE}`]: new Date(),
                    })
                    .then(() => console.log('Logged in user with ID:', account.uid)) // remove
                    .catch((error) => console.error('Error logging in user:', error)), // remove
        );

    // Log Out
    static accountLogOut = (profile) =>
        authentication.signOut().then(
            () =>
                users
                    .doc(profile.id)
                    .update({
                        status: OFFLINE,
                        [`time.${OFFLINE}`]: new Date(),
                    })
                    .then(() => console.log('Logged out user with ID:', profile.id)) // remove
                    .catch((error) => console.error('Error logging out user:', error)), // remove
        );
}

export default apiAccount;
