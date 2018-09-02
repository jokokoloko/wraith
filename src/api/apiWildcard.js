import { wildcards } from './firebase';

class apiWildcard {
    // Load
    static wildcardsLoad = () =>
        wildcards
            .orderBy('order', 'asc')
            .get()
            .then((snapshot) => {
                console.log('Wildcards:', snapshot.size); // remove
                return snapshot.docs.map((wildcard) => wildcard.data());
            })
            .catch((error) => console.error('Error getting wildcards:', error)); // remove
}

export default apiWildcard;
