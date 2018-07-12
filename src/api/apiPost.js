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
}

export default apiPost;
