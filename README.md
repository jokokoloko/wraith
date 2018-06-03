# Spectre

React ES6 Starter Application

## Stack

React `16.4.0`</br >
React Router `4.2.2`</br >
Redux `4.0.0`</br >
Firebase `5.0.4`</br >
Font Awesome `1.1.8`</br >
Bootstrap `4.1.0`

## Database

[Firebase](https://firebase.google.com/) has been added as a temporary dependency for testing authentication with React, React Router, and Redux.

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

If you want to use Redux DevTools to debug Redux, download the Chrome extension here: [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=en)

## Production

To build for production:

```sh
$ npm run build
```
