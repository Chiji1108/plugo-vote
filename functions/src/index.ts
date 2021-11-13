import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();

// exports.writeToFirestore = functions.region('asia-northeast1').firestore
//   .document('some/doc')
//   .onWrite((change, context) => {
//     db.doc('some/otherdoc').set({ ... });
//   });

exports.vote = functions
  .region("asia-northeast1")
  .https.onCall((data, context) => {
    // ...
  });
