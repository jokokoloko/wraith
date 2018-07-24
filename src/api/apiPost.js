import apiProfile from './apiProfile';
import apiSlug from './apiSlug';
import { authentication, posts } from './firebase';
import { POSTS, PUBLISHED } from '../js/data';

class apiPost {
    // Add
    static postAdd = (form) =>
        authentication.currentUser &&
        posts
            .add({
                ...form,
                user: authentication.currentUser.uid,
                status: PUBLISHED,
                time: {
                    created: new Date(),
                },
            })
            .then((post) => {
                post.update({
                    id: post.id,
                });
                apiProfile.profileAuthor(POSTS, post.id);
                apiSlug.slugAdd(form.slug, POSTS, post.id);
                console.log('Added post:', post.id); // remove
            })
            .catch((error) => console.error('Error adding post:', error)); // remove

    // Edit
    static postEdit = (form) =>
        authentication.currentUser.uid === form.user &&
        posts
            .doc(form.id)
            .update({
                ...form,
                'time.edited': new Date(),
            })
            .then(() => {
                apiSlug.slugAdd(form.slug, POSTS, form.id);
                console.log('Edited post:', form.id); // remove
            })
            .catch((error) => console.error('Error editing post:', error)); // remove

    // Load
    static postsLoad = () =>
        posts
            .orderBy('time.created', 'desc')
            .get()
            .then((snapshot) => {
                console.log(`Posts: ${snapshot.size}`); // remove
                // snapshot.forEach((post) => console.log(post.id, '=>', post.data())); // remove
                return snapshot.docs.map((post) => post.data());
            })
            .catch((error) => console.error('Error getting posts:', error)); // remove

    static postsLoadByUser = (user) =>
        posts
            .where('user', '==', user)
            .orderBy('time.created', 'desc')
            .get()
            .then((snapshot) => {
                console.log(`Posts by user: ${snapshot.size}`); // remove
                // snapshot.forEach((post) => console.log(post.id, '=>', post.data())); // remove
                return snapshot.docs.map((post) => post.data());
            })
            .catch((error) => console.error('Error getting posts by user:', error)); // remove
}

export default apiPost;
