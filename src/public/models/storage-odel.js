/* image handling
  /users/{userId}/images/{imageId}.jpg
  unike filnavn, UUID
  rules
    match /users/{userId}/images/{imageId} {
      allow read, write: 
        if request.auth != null && 
        request.auth.uid == userId;
    }
  metadata i firestore
    match /users/{userId}/images/{imageId} {
      allow read, write: 
        if request.auth != null && 
        request.auth.uid == userId;
    }

  api
    upload
    get
      url holder

  mellomledd: database
    get, delete, metadata, resize

  Rate Limiting og Feilhåndtering
  resizing client side
*/

import { storage } from '/models/firebase-services.js';

export const storageModel = {}







const storageRef = firebase.storage().ref(`/users/${userId}/userUploads/${fileId}`);
filePath: `/users/${userId}/file/${imageId}`, // Store the path as a string


// psudo upload button onclick pub(click upload file, e.target.files[0])
// psudo sub(click upload file, handleFileUpload(obj));
