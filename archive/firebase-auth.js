import { pub, sub } from '/shared/pubsub.js'
import { auth } from '/firebase/firebase-services.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js'
const authModuleUrl = 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'

// import(authModuleUrl)
// .then(module => {
//   // Destructure the named exports
//   const { 
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     updateProfile
//   } = module
// })
// .catch(e => { console.log(e) })

export async function signin(email = null, password = null) {
  if ((! email) && (! password)) {
    email = document.querySelector('input[type="email"]').value
    password = document.querySelector('input[type="password"]').value
  }

  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (e) { 
    return e 
  }
}

export async function signout() {
  try {
    await signOut(auth)
  } catch (e) { console.error(e) }
}



export function updateDisplayNameOfCurrentUser(displayName) {
  updateProfile(auth.currentUser, {
    displayName: displayName
  });
}