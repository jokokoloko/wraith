import { slugs } from './firebase';

class apiSlug {
    // Add
    static slugAdd = (id, collection, reference) =>
        slugs
            .doc(id)
            .set({
                id,
                collection,
                reference,
            })
            .then(() => console.log('Added slug:', id)) // remove
            .catch((error) => console.error('Error adding slug:', error)); // remove
}

export default apiSlug;
