import delay from './delay'; // remove later and remove delay from all functions
import { authentication } from './firebase'; // remove and replace

class apiAccount {
    // Check
    static accountCheck = () =>
        new Promise((resolve, reject) =>
            setTimeout(() => {
                // remove
                const unsub = authentication.onAuthStateChanged(
                    // we need a similar function in Azure Search
                    (user) => {
                        unsub();
                        resolve(user);
                        if (user) {
                            console.log(`User: ${user.email}`); // remove
                        } else {
                            console.log('User: guest'); // remove
                        }
                    },
                    (error) => reject(error),
                );
                console.log('Account checked.'); // remove
            }, delay),
        );

    // Register
    static accountRegister = (user) => authentication.createUserWithEmailAndPassword(user.email, user.password);

    // Reset Password
    static accountResetPassword = (user) => authentication.sendPasswordResetEmail(user.email);

    // Log In
    static accountLogIn = (user) => authentication.signInWithEmailAndPassword(user.email, user.password);

    // Log Out
    static accountLogOut = () => authentication.signOut();
}

export default apiAccount;
