var admin = require('firebase-admin');
var config = require('./config.js');
var serviceAccount = require('./key/invade-blue-firebase-adminsdk-qm1p1-fbc073da7b.json');
var wildcards = require('./wildcards');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firestore.dbUrl,
});

const db = admin.firestore();

function updateWildcards() {
    var batch = db.batch();

    Object.keys(wildcards).forEach((wc, idx) => {
        const item = wildcards[wc];
        var col = db.collection('wildcards');
        var doc = col.doc(item.id);
        batch.set(doc, item);
    });
    batch.commit();
}

//trigger.
updateWildcards();
