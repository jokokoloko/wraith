var admin = require('firebase-admin');
var axios = require('axios');
var qs = require('qs');
var config = require('./config.js');
var serviceAccount = require('./key/invade-blue-firebase-adminsdk-qm1p1-fbc073da7b.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firestore.dbUrl,
});

const db = admin.firestore();

const testData = {
    name: 'foo',
    handle: 'bar',
};

function updateChampList() {
    var batch = db.batch();
    var { riot } = config;
    return axios
        .get(`${riot.staticData.base}/${riot.staticData.version}/data/${riot.locale}/champion.json`)
        .then((response) => {
            var champData = response.data.data;
            var col = db.collection('champions');
            Object.entries(champData).forEach((champ) => {
                //the id per entry is the champ name, but we want the champKey
                const entryData = champ[1];
                const dataCopy = { ...champ[1] };
                //switch key and id.
                dataCopy.id = entryData.key;
                dataCopy.key = entryData.id;
                //turn tags into object format
                dataCopy.tags = {};
                entryData.tags.forEach((tag) => {
                    dataCopy.tags[tag] = true;
                })
                const item = col.doc(dataCopy.id);
                batch.set(item, dataCopy);
            });
            batch.commit();
        })
        .catch((error) => {
            console.log(error);
        });
}

//trigger.
updateChampList();

// Add a new document in collection "cities" with ID 'LA'
// var setDoc = db
//     .collection('cities')
//     .doc('LA')
//     .set(testData);
