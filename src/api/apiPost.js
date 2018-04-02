import delay from './delay'; // remove later and remove delay from all functions
import { findIndexByKey } from '../js/filter'; // possibly remove later and copy and paste function directly into this file or import from another located on the server
import { slugify } from '../js/function'; // possibly remove later and copy and paste function directly into this file or import from another located on the server
import posts from '../data/dataPost'; // remove

class apiPost {
    // Save
    static postSave(post) {
        post = Object.assign({}, post); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const titleLength = 1;
                if (post.title.length < titleLength) {
                    reject(`Title must be at least ${titleLength} characters.`);
                }
                if (post.key) {
                    const index = findIndexByKey(posts, post.key);
                    post.id = slugify(post.title); // this changes the slug (id) of the post if the title of the post has changed
                    posts.splice(index, 1, post);
                } else {
                    // Just simulating creation here.
                    // The server would generate keys and ids for new posts in a real app.
                    // Cloning so copy returned is passed by value rather than by reference.
                    const array = new Uint32Array(1); // remove when better way to generate id is found
                    const random = window.crypto.getRandomValues(array); // find better way of doing this and make it so that a post's id is unique and can never change
                    post.key = random[0];
                    post.id = slugify(post.title); // modify this function to also remove the words and, to, in, is, etc. (low priority)
                    post = Object.assign({}, post, {
                        // this is necessary to define any defaults, especially number types
                        view: 0,
                        rate: 0,
                        love: 0,
                        hate: 0,
                        count: {
                            news: 0,
                            reviews: 0,
                            comments: 0,
                            photos: 0,
                        },
                    });
                    posts.push(post);
                }
                resolve(post);
            }, delay);
        });
    }
    // Delete
    static postDelete(post) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = findIndexByKey(posts, post.key);
                posts.splice(index, 1);
                resolve();
            }, delay);
        });
    }
    // Load
    static postsLoad() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], posts));
            }, delay);
        });
    }
}

export default apiPost;
