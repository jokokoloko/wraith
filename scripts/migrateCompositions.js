var admin = require('firebase-admin');
var config = require('./config.js');
var serviceAccount = require('./key/invade-blue-firebase-adminsdk-qm1p1-fbc073da7b.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firestore.dbUrl,
});

const db = admin.firestore();

function migrateComps() {
    var batch = db.batch();
    var col = db.collection('compositions');
    col.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            let data = doc.data();
            let compRef = db.collection('compositions').doc(doc.id);
            let curNote = data.note;
            // console.log('my note', curNote);
            if (curNote) {
                let notePick = { general: '', lanes: {}};
                let noteBan = { general: '', lanes: {}};
                Object.keys(curNote).forEach((lane, idx) => {
                    let curItem = curNote[lane];
                    notePick.lanes[lane] = curItem.notes || '';
                    noteBan.lanes[lane] = curItem.ban || '';
                });
                batch.set(compRef, { notePick: notePick, noteBan: noteBan }, {merge: true});
            }
        });
        batch.commit();
    });
}

//trigger.
migrateComps();
