import { pub, sub }       from '/shared/pubsub.js';
import firebaseConfig from '/shared/firebase-config.js';
import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getAuth }        from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import { getFirestore }   from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
import { getStorage }     from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js';

let app, auth, db, storage

async function initializeFirebaseSDK() {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth()
    // db = getFirestore()
    // storage = getStorage()
    pub('firebase services initialized')
  } catch(e) {
    console.log(e.message)
  }
}

export { initializeFirebaseSDK, app, auth, db, storage }