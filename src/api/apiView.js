import { authentication, firestore, slugs } from './firebase';

class apiView {
    // Load
    static viewLoad = (slug, collection) =>
        collection
            ? firestore
                  .collection(collection)
                  .doc(slug)
                  .get()
                  .then((view) => {
                      view.exists ? console.log('View:', view.data()) : console.log('No such view!'); // remove
                      return view.data();
                  })
                  .catch((error) => console.error('Error getting view:', error)) // remove
            : slugs
                  .doc(slug)
                  .get()
                  .then((slug) => {
                      if (slug.exists) {
                          console.log('Slug:', slug.data()); // remove
                          return firestore
                              .collection(slug.data().collection)
                              .doc(slug.data().reference)
                              .get()
                              .then((view) => {
                                  view.exists ? console.log('View:', view.data()) : console.log('No such view!'); // remove
                                  return view.data();
                              })
                              .catch((error) => console.error('Error getting view:', error)); // remove
                      } else {
                          console.log('No such slug!'); // remove
                      }
                  })
                  .catch((error) => console.error('Error getting slug:', error)); // remove

    static viewLoadForEdit = (slug, collection) =>
        authentication.currentUser &&
        firestore
            .collection(collection)
            .doc(slug)
            .get()
            .then((view) => {
                view.exists ? console.log('View for edit:', view.data()) : console.log('No such view for edit!'); // remove
                return authentication.currentUser.uid === view.data().user && view.data();
            })
            .catch((error) => console.error('Error getting view for edit:', error)); // remove
}

export default apiView;
