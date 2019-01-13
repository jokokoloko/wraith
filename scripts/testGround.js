var admin = require('firebase-admin');
var config = require('./config.js');
var serviceAccount = require('./key/invade-blue-firebase-adminsdk-qm1p1-fbc073da7b.json');
var wildcards = require('./wildcards');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firestore.dbUrl,
});

const db = admin.firestore();

var compsRef = db.collection('compositions');
function getPagedResults() {
    var first = compsRef.orderBy("time.created", "desc").limit(5);

    first.get().then((documentSnapshots) => {
        var last = documentSnapshots.docs[documentSnapshots.docs.length-1];
        console.log("last", last);

        //for pagination to work, has to be created like below.
        var next = compsRef.orderBy("time.created", "desc")
                .startAfter(last).limit(5);
        //next.limit(5);

        next.get().then((documentSnapshots) => {
            var newlast = documentSnapshots.docs[documentSnapshots.docs.length-1];
            var first = documentSnapshots.docs[0];
            console.log("first", first);
            console.log("new last", newlast);
        });
    });
}

//trigger.
getPagedResults();
