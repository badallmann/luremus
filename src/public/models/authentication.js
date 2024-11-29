import { pub, sub } from '/shared/pubsub.js';
import { TOPICS }   from '/shared/topics.js';
import { auth }     from '/models/firebase-services.js';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  deleteUser,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js'

export const authentication = {
  wasSignedInEarlier: false,

  observeAuthStateChanges() {
    // sets observer
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        pub(TOPICS.AUTH_STATE_CHANGE_SIGNED_IN)
        console.log(
          'Signed in as '
          + auth.currentUser.email
        )
      } else { 
        pub(TOPICS.AUTH_STATE_CHANGE_SIGNED_OUT)
      }
    })
  },

  async signIn(topicData) {
    try {
      const { email, password } = topicData.formData;
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Error signing in:', error.message);
      pub(TOPICS.ERROR_SIGNING_IN, error);
      return error;
    }
  },

  async createFirebaseUser(topicData) {
    try {
      const { email, password } = topicData.formData;
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      //await updateProfile(user, { displayName });
      console.log("User account created successfully:", user);
      return user;
    } catch (error) {
      console.error("Error creating user account:", error);
      pub(TOPICS.ERROR_CREATING_USER, error);
      throw error;
    }
  },
  
  async signOut() {
    try {
      // Attempt to sign out the user
      await signOut(auth);
      console.log('User signed out successfully');
      // Optionally, you could redirect the user or perform some cleanup actions
    } catch (error) {
      // Handle any errors that occur during sign out
      console.error('Error signing out:', error.message);
      // Optionally, return the error if further handling is needed
      return error;
    }
  },

  // ! requires recent sign in
  async deleteFirebaseUser() {
    try {
      const user = auth.currentUser;
      await deleteUser(user);
      console.log("User account deleted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  },
}