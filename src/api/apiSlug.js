import { slugs } from './firebase';

class apiSlug {
    // Add
    static slugAdd = (id, collection, reference, batch = null) => {
        if (!id) return;
        let slugRef = slugs.doc(id);
        let updatedData = {
            id,
            collection,
            reference,
        };
        if (batch) {
            batch.set(slugRef, updatedData);
            console.log('Added slug:', id); // remove
        } else {
            return slugRef
                .set(updatedData)
                .then(() => console.log('Added slug:', id)) // remove
                .catch((error) => console.error('Error adding slug:', error)); // remove
        }
    };
}

export default apiSlug;
