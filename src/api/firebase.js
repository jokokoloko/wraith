import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { SLUGS, USERS, POSTS } from '../js/data';

const config = {
    apiKey: 'AIzaSyCuh2sVwKQcaLSTyW9EKXplIdW6b22ZPk4',
    authDomain: 'spectre-cc13b.firebaseapp.com',
    databaseURL: 'https://spectre-cc13b.firebaseio.com',
    projectId: 'spectre-cc13b',
    storageBucket: 'spectre-cc13b.appspot.com',
    messagingSenderId: '783992202847',
};
firebase.initializeApp(config);

export const authentication = firebase.auth();
export const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true }; // Patch for Date error (possibly only necessary while in beta)
firestore.settings(settings); // Currently only needed for the patch above

export const slugs = firestore.collection(SLUGS);
export const users = firestore.collection(USERS);
export const posts = firestore.collection(POSTS);
