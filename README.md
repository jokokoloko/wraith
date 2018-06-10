# Spectre

React ES6 Starter Application

## Stack

React `16.4.0`</br >
React Router `4.2.2`</br >
Redux `4.0.0`</br >
Firebase `5.0.4`</br >
Font Awesome `1.1.8`</br >
Bootstrap `4.1.0`

## Platform

This application is built using [Firebase](https://firebase.google.com/) as its mobile development platform.

The Firebase services that are currently being used:

[Authentication](https://firebase.google.com/docs/auth)</br >
[Cloud Firestore](https://firebase.google.com/docs/firestore)

Comparisons with other platforms:

[Firebase vs. Azure Search](http://db-engines.com/en/system/Firebase+Realtime+Database%3BMicrosoft+Azure+Search)

## Prerequisites

*   Install [node.js](http://nodejs.org/)
*   Clone the repository: https://github.com/jokokoloko/spectre.git

## Installation

First, you must register Font Awesome:

```sh
$ npm config set "@fortawesome:registry" https://npm.fontawesome.com
$ npm config set "//npm.fontawesome.com/:_authToken" 8516A1CE-3B7B-48A0-BF42-4CA83CD66816
```

Then, go to the spectre repository on your local machine and install the packages:

```sh
$ npm install
```

## Development

To run the application for development:

```sh
$ npm start
```

To use Redux DevTools for debugging the state of the application, download the Chrome extension here: [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=en)

## Production

To build for production:

```sh
$ npm run build
```
