import { slugs } from './firebase';
import { generateID } from '../js/function';

class apiSlug {
    // Add
    static slugAdd = (id, collection) =>
        slugs
            .doc(id)
            .set({
                slug: generateID(id).toLowerCase(),
                id,
                collection,
            })
            .then(() => console.log('Added slug with ID:', id)) // remove
            .catch((error) => console.error('Error adding slug:', error)); // remove
}

export default apiSlug;
