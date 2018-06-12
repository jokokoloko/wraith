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
    return axios
        .get(`${config.riot.baseUrl}/static-data/v3/champions`, {
            params: {
                locale: config.riot.locale,
                api_key: config.riot.apiKey,
                dataById: true,
                champListData: ['image', 'info'],
            },
            paramsSerializer: function(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
        })
        .then((response) => {
            // console.log(response);
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
