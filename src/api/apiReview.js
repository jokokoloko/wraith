import delay from './delay'; // remove later and remove delay from all functions
import { findIndexByKey } from '../js/filter'; // possibly remove later and copy and paste function directly into this file or import from another located on the server
import reviews from '../data/dataReview'; // remove

class apiReview {
    // Save
    static reviewSave(review) {
        review = Object.assign({}, review); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const contentLength = 1;
                if (review.content.length < contentLength) {
                    reject(`A review must be at least ${contentLength} characters.`);
                }
                if (review.key) {
                    const index = findIndexByKey(reviews, review.key);
                    reviews.splice(index, 1, review);
                } else {
                    // Just simulating creation here.
                    // The server would generate keys and ids for new reviews in a real app.
                    // Cloning so copy returned is passed by value rather than by reference.
                    const array = new Uint32Array(1); // remove when better way to generate id is found
                    const random = window.crypto.getRandomValues(array); // find better way of doing this and make it so that a review's id is unique and can never change
                    review.key = random[0];
                    review = Object.assign({}, review, {
                        // this is necessary to define any defaults, especially number types
                        view: 0,
                        rate: 0,
                        love: 0,
                        hate: 0,
                        count: {
                            comments: 0,
                        },
                    });
                    // reviews.push(review); // modify for pushing into an array within an object possibly using reviews[review.post].push(review)
                }
                resolve(review);
            }, delay);
        });
    }
    // Delete
    static reviewDelete(review) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = findIndexByKey(reviews, review.key);
                reviews.splice(index, 1);
                resolve();
            }, delay);
        });
    }
    // Load
    static reviewsLoad() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign({}, reviews));
            }, delay);
        });
    }
}

export default apiReview;
