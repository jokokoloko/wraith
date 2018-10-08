import apiProfile from './apiProfile';
import apiSlug from './apiSlug';
import { authentication, compositions, firestore } from './firebase';
import { COMPOSITIONS, PUBLISHED } from '../js/data';
import * as client from '../js/client';

class apiComposition {
    // Add
    static compositionAdd = (data) => {
        let newComp = compositions.doc();
        let batch = firestore.batch();
        batch.set(newComp, {
            ...data,
            id: newComp.id,
            slug: data.slug || newComp.id,
            user: (authentication.currentUser && authentication.currentUser.uid) || 'guest',
            status: PUBLISHED,
            patch: client.PATCH,
            time: {
                created: new Date(),
            },
        });
        authentication.currentUser && apiProfile.profileAuthor(COMPOSITIONS, newComp.id, batch);
        data.slug && apiSlug.slugAdd(data.slug, COMPOSITIONS, newComp.id, batch);
        apiSlug.slugAdd(newComp.id, COMPOSITIONS, newComp.id, batch);
        return batch
            .commit()
            .then(() => {
                console.log('Added composition:', newComp.id); // remove
                // now that it is batched, we need to get the composition we saved
                return newComp
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            return doc.data();
                        } else {
                            console.error('Cannot find composition document');
                        }
                    })
                    .catch((error) => console.error('Error getting composition:', error));
            })
            .catch((error) => console.error('Error adding composition:', error)); // remove
    };

    // Edit
    static compositionEdit = (data) => {
        if (authentication.currentUser.uid === data.user) {
            let compRef = compositions.doc(data.id);
            let batch = firestore.batch();
            // update the comp
            batch.update(compRef, {
                ...data,
                patch: client.PATCH,
                'time.edited': new Date(),
            });
            // update the slug
            data.slug && apiSlug.slugAdd(data.slug, COMPOSITIONS, data.id, batch);
            return batch
                .commit()
                .then(() => {
                    console.log('Edited composition:', data.id); // remove
                })
                .catch((error) => console.error('Error editing composition:', error)); // remove
        }
    };

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

    static compositionsLoadByTime = (order, limit, startAfterDoc = false) => {
        let ref = compositions.orderBy('time.created', order).limit(limit);
        if (startAfterDoc) {
            ref.startAfter(startAfterDoc);
        }
        return ref.get()
            .then((snapshot) => {
                return snapshot.docs.map((composition) => composition.data());
            })
            .catch((error) => console.error('Error getting compositions by time:', error));
    }
}

export default apiComposition;
