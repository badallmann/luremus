import { pub, sub } from "/shared/pubsub.js";
import { TOPICS }   from "/shared/topics.js";
import { authentication } from "/models/authentication.js";
import { menu }           from "/views/menu.js";

export function coupleTopics() {
  // Menu navigation
  sub(TOPICS.MENU_NAV, data => {
    menu.update(data.navTo);
  });
  sub(TOPICS.MENU_NAV_BACK, menu.navigateBack)

  // Auth state changes
  sub(TOPICS.AUTH_STATE_CHANGE_SIGNED_OUT, () => {
    pub(TOPICS.MENU_NAV, { navTo: menu.pages.signedOut })
  });
  sub(TOPICS.AUTH_STATE_CHANGE_SIGNED_IN,  () => {
    authentication.wasSignedInEarlier = true;
    pub(TOPICS.MENU_NAV, { navTo: menu.pages.signedIn })
  });

  // Auth actions
  sub(TOPICS.SUBMIT_SIGN_IN,     authentication.signIn);
  sub(TOPICS.SUBMIT_CREATE_USER, authentication.createFirebaseUser);
  sub(TOPICS.SIGN_OUT,           authentication.signOut);
  sub(TOPICS.DELETE_USER,        authentication.deleteFirebaseUser)

  // Errors
  sub(TOPICS.ERROR_SIGNING_IN, () => {
    pub(TOPICS.MENU_NAV, { navTo: menu.pages.errorSigningIn });
  })
  sub(TOPICS.ERROR_CREATING_USER, () => {
    pub(TOPICS.MENU_NAV, { navTo: menu.pages.errorCreatingUser });
  })
}