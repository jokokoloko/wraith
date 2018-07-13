import apiProfile from './apiProfile';
import apiSlug from './apiSlug';
import { authentication, posts } from './firebase';
import { generateID } from '../js/function';
import { POSTS, PUBLISHED } from '../js/data';

class apiPost {
    // Add
    static postAdd = (form) => {
        const id = generateID();
        return posts
            .doc(id)
            .set({
                ...form,
                user: authentication.currentUser.uid,
                status: PUBLISHED,
                time: {
                    created: new Date(),
                },
                id,
            })
            .then(() => {
                apiProfile.profileAuthor(POSTS, id);
                apiSlug.slugAdd(form.slug, POSTS, id);
                console.log('Added post:', id); // remove
            })
            .catch((error) => console.error('Error adding post:', error)); // remove
    };

    // Load
    static postsLoad = () =>
        posts
            .get()
            .then((snapshot) => {
                console.log(`Posts: ${snapshot.size}`); // remove
                // snapshot.forEach((post) => console.log(post.id, '=>', post.data())); // remove
                return snapshot.docs.map((post) => post.data());
            })
            .catch((error) => console.error('Error getting posts:', error)); // remove
}

export default apiPost;
