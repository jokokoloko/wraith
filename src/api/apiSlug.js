import { slugs } from './firebase';

class apiSlug {
    // Add
    static slugAdd = (id, slug, collection) =>
        slugs
            .doc(id)
            .set({
                id,
                slug,
                collection,
            })
            .then(() => console.log('Added slug with ID:', id)) // remove
            .catch((error) => console.error('Error adding slug:', error)); // remove

    // Edit
    static slugEdit = (id, slug) =>
        slugs.doc(id).update({
            slug,
        });
}

export default apiSlug;
