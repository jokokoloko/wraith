import delay from './delay'; // remove later and remove delay from all functions
import { ref, firebaseAuth } from './firebase'; // remove and replace

class apiAccount {
    // Check
    static accountCheck() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // remove
                const unsub = firebaseAuth().onAuthStateChanged(
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
            }, delay);
        });
    }
    // Save
    static accountSave(user) {
        return ref
            .child(`user/${user.uid}/account`)
            .set({
                key: user.uid,
                email: user.email,
            })
            .then(() => user);
    }
    // Register
    static accountRegister(user) {
        return firebaseAuth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(this.accountSave);
    }
    // Reset Password
    static accountResetPassword(user) {
        return firebaseAuth().sendPasswordResetEmail(user.email);
    }
    // Log In
    static accountLogIn(user) {
        return firebaseAuth().signInWithEmailAndPassword(user.email, user.password);
    }
    // Log Out
    static accountLogOut() {
        return firebaseAuth().signOut();
    }
}

export default apiAccount;
