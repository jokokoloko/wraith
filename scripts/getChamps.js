var admin = require('firebase-admin');
var axios = require('axios');
var config = require('./config.js');
var serviceAccount = require('./key/teamgg-12e72-firebase-adminsdk-x3bx3-a296db3ecb.json');

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
    return axios
        .get(`${config.riot.baseUrl}/static-data/v3/champions`, {
            params: {
                locale: config.riot.locale,
                api_key: config.riot.apiKey,
                dataById: true,
            },
        })
        .then((response) => {
            // console.log(response.data);
            var champData = response.data.data;
            var col = db.collection('champions');
            Object.entries(champData).forEach((champ) => {
                let item = col.doc(champ[0]);
                batch.set(item, champ[1]);
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
