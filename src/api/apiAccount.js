import { authentication, users } from './firebase';

class apiAccount {
    console.log("hi henry");
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
                        id: account.uid,
                        email: account.email,
                        time: {
                            created: new Date(),
                        },
                    })
                    .then(() => console.log('Added user with ID:', account.uid)) // remove
                    .catch((error) => console.error('Error adding user:', error)), // remove
        );

    // Reset Password
    static accountResetPassword = (account) => authentication.sendPasswordResetEmail(account.email);

    // Log In
    static accountLogIn = (account) => authentication.signInWithEmailAndPassword(account.email, account.password);

    // Log Out
    static accountLogOut = () => authentication.signOut();
}

export default apiAccount;
