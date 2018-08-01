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
                return composition;
            })
            .catch((error) => console.error('Error adding composition:', error)); // remove

    // Load
    static compositionsLoad = () =>
        compositions
            .orderBy('time.created', 'desc')
            .get()
            .then((snapshot) => {
                console.log('Compositions:', snapshot.size); // remove
                // snapshot.forEach((composition) => console.log(composition.id, '=>', composition.data())); // remove
                return snapshot.docs.map((composition) => composition.data());
            })
            .catch((error) => console.error('Error getting compositions:', error)); // remove

    static compositionsLoadByUser = (user) =>
        compositions
            .where('user', '==', user)
            .orderBy('time.created', 'desc')
            .get()
            .then((snapshot) => {
                console.log('Compositions by user:', snapshot.size); // remove
                // snapshot.forEach((composition) => console.log(composition.id, '=>', composition.data())); // remove
                return snapshot.docs.map((composition) => composition.data());
            })
            .catch((error) => console.error('Error getting compositions by user:', error)); // remove
}

export default apiComposition;
