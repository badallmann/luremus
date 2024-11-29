import { initializeFirebaseSDK } from "/models/firebase-services.js";
import { authentication } from "/models/authentication.js";
import { coupleTopics }   from "/controllers/couplings.js";
import { handleLanding }  from "/controllers/landing.js";

export function init() {
  initializeFirebaseSDK();
  authentication.observeAuthStateChanges();
  coupleTopics();
  handleLanding();
}