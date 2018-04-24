import * as firebase from 'firebase';

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
