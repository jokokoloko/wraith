import { firestore } from './firebase';

class apiView {
    // Load
    static viewLoad = (slug, collection) =>
        firestore
            .collection(collection)
            .doc(slug)
            .get()
            .then((view) => {
                view.exists ? console.log('View:', view.data()) : console.log('No such view!'); // remove
                return view.data();
            })
            .catch((error) => console.error('Error getting view', error)); // remove
}

export default apiView;
