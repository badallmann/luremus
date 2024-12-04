import firebaseConfig     from '/config/luremus-firebase-config.js';
import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getAuth }        from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import { getFirestore }   from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
import { getStorage }     from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js';

let app, auth, db, storage;

function initializeFirebaseSDK() {
  try {
    app     = initializeApp(firebaseConfig)
    auth    = getAuth()
    db      = getFirestore()
    storage = getStorage()

    console.log('Firebase services initialized');
  } catch(e) {
    console.log(e.message)
  }
}

export { initializeFirebaseSDK, app, auth, db, storage }