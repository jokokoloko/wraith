import apiProfile from './apiProfile';
import apiSlug from './apiSlug';
import { authentication, compositions } from './firebase';
import { COMPOSITIONS, PUBLISHED } from '../js/data';

class apiComposition {
    // Add
    static compositionAdd = (data) =>
        compositions
            .add({
                ...data,
                user: (authentication.currentUser && authentication.currentUser.uid) || 'guest',
                status: PUBLISHED,
                time: {
                    created: new Date(),
                },
            })
            .then((composition) => {
                composition.update({
                    id: composition.id,
                });
                authentication.currentUser && apiProfile.profileAuthor(COMPOSITIONS, composition.id);
                data.slug && apiSlug.slugAdd(data.slug, COMPOSITIONS, composition.id);
                apiSlug.slugAdd(composition.id, COMPOSITIONS, composition.id);
                console.log('Added composition:', composition.id); // remove
            })
            .catch((error) => console.error('Error adding composition:', error)); // remove
}

export default apiComposition;
