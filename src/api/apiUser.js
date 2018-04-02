import delay from './delay'; // remove later and remove delay from all functions
import users from '../data/dataUser'; // remove

class apiUser {
    // Save
    static userSave(user) {
        user = Object.assign({}, user); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const nameLength = 3;
                if (user.firstName.length < nameLength) {
                    reject(`First Name must be at least ${nameLength} characters.`);
                }
                if (user.lastName.length < nameLength) {
                    reject(`Last Name must be at least ${nameLength} characters.`);
                }
                if (user.id) {
                    const index = users.findIndex((a) => a.id === user.id);
                    users.splice(index, 1, user);
                } else {
                    // Just simulating creation here.
                    // The server would generate keys and ids for new users in a real app.
                    // Cloning so copy returned is passed by value rather than by reference.
                    user.id = `${user.firstName.toLowerCase()}-${user.lastName.toLowerCase()}`;
                    users.push(user);
                }
                resolve(user);
            }, delay);
        });
    }
    // Delete
    static userDelete(user) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = users.findIndex((u) => u.id === user.id);
                users.splice(index, 1);
                resolve();
            }, delay);
        });
    }
    // Load
    static usersLoad() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], users));
            }, delay);
        });
    }
}

export default apiUser;
