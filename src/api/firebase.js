import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyAR5k-yTH4BDN8mHjo6LOO2f2H29WojJcQ',
    authDomain: 'spectre-c0e66.firebaseapp.com',
    databaseURL: 'https://spectre-c0e66.firebaseio.com',
    storageBucket: 'spectre-c0e66.appspot.com',
    messagingSenderId: '799400168925',
};
firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
