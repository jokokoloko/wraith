import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { SLUGS, USERS, POSTS, CHAMPIONS, COMPOSITIONS, WILDCARDS } from '../js/data';

const config = {
    apiKey: 'AIzaSyDzKR2q6lZuEG62Uge7nAddXOA33mvACjc',
    authDomain: 'invade-blue.firebaseapp.com',
    databaseURL: 'https://invade-blue.firebaseio.com',
    projectId: 'invade-blue',
    storageBucket: 'invade-blue.appspot.com',
    messagingSenderId: '305383624349',
};
firebase.initializeApp(config);

export const authentication = firebase.auth();
export const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true }; // Patch for Date error (possibly only necessary while in beta)
firestore.settings(settings); // Currently only needed for the patch above

export const slugs = firestore.collection(SLUGS);
export const users = firestore.collection(USERS);
export const posts = firestore.collection(POSTS);
export const champions = firestore.collection(CHAMPIONS);
export const compositions = firestore.collection(COMPOSITIONS);
export const wildcards = firestore.collection(WILDCARDS);
