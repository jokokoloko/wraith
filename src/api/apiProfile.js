import { users } from './firebase';

class apiProfile {
    // Load
    static profileLoad = (account) =>
        users
            .where('uid', '==', account.uid)
            .get()
            .then((snapshot) => {
                console.log(`Users: ${snapshot.size}`); // remove
                snapshot.forEach((user) => console.log(user.id, '=>', user.data())); // remove
                const result = snapshot.docs.map((user) => user.data());
                console.log('Result:', result[0]); // remove
                return result[0]; // monitor and investigate whether or not this is the best solution
            })
            .catch((error) => console.error('Error getting users', error)); // remove
}

export default apiProfile;
