import apiProfile from './apiProfile';
import apiSlug from './apiSlug';
import { authentication, posts } from './firebase';
import { POSTS, PUBLISHED } from '../js/data';

class apiPost {
    // Add
    static postAdd = (form) =>
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
                posts
                    .doc(post.id)
                    .update({
                        id: post.id,
                    })
                    .then(() => console.log('Added "id" property to post:', post.id)) // remove
                    .catch((error) => console.error('Error adding "id" property to post:', error)); // remove
                apiProfile.profileAuthor(POSTS, post.id);
                apiSlug.slugAdd(form.slug, POSTS, post.id);
                console.log('Added post:', post.id); // remove
            })
            .catch((error) => console.error('Error adding post:', error)); // remove

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
}

export default apiPost;
