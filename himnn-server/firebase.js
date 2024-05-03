const admin = require("firebase-admin");
const serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore()
const timestamp = admin.firestore.FieldValue.serverTimestamp()

module.exports = { db, timestamp }