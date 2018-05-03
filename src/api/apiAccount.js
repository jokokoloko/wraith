import { authentication, users } from './firebase';

class apiAccount {
    // Check
    static accountCheck = () =>
        new Promise((resolve, reject) => {
            const unsubscribe = authentication.onAuthStateChanged(
                (user) => {
                    unsubscribe(); // this shouldn't be run during registering, logging in, and logging out.
                    resolve(user);
                    user
                        ? console.log(`User: ${user.email}`) // this shouldn't run twice when unsubscribe() is removed
                        : console.log('User: guest'); // this shouldn't run twice when unsubscribe() is removed
                },
                (error) => reject(error),
            );
            console.log('Account checked.'); // remove
        });

    // Register
    static accountRegister = (user) =>
        authentication.createUserWithEmailAndPassword(user.email, user.password).then(
            (user) =>
                users
                    .add({
                        uid: user.uid,
                        email: user.email,
                    })
                    .then((user) => {
                        users.doc(user.id).update({
                            id: user.id,
                            created: new Date(),
                        });
                        console.log('Added user with ID:', user.id); // remove
                    })
                    .catch((error) => console.error('Error adding user:', error)), // remove
        );

    // Reset Password
    static accountResetPassword = (user) => authentication.sendPasswordResetEmail(user.email);

    // Log In
    static accountLogIn = (user) => authentication.signInWithEmailAndPassword(user.email, user.password);

    // Log Out
    static accountLogOut = () => authentication.signOut();
}

export default apiAccount;
