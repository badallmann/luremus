import { authModel } from "/firebase/auth-model.js";
import { pub, sub }  from "/shared/pubsub.js";
import { TOPICS }    from "/shared/topics.js";
import { menu }      from "/views/menu.js";
import { longan } from '/models/longan.js';

export function coupleTopics() {
  // Menu navigation
    sub(TOPICS.MENU_NAV, data => {
      menu.update(data.navTo);
    });
    sub(TOPICS.MENU_NAV_BACK, menu.navigateBack);

  // Auth state changes
    sub(TOPICS.AUTH_STATE_CHANGE_SIGNED_OUT, () => {
      pub(TOPICS.MENU_NAV, { navTo: menu.pages.signedOut });
    });
    sub(TOPICS.AUTH_STATE_CHANGE_SIGNED_IN, () => {
      authModel.wasSignedInEarlier = true;
      pub(TOPICS.MENU_NAV, { navTo: menu.pages.signedIn });
    });

  // Auth actions
    sub(TOPICS.SUBMIT_SIGN_IN,     authModel.signIn);
    sub(TOPICS.SUBMIT_CREATE_USER, authModel.createAuthUser);
    sub(TOPICS.SIGN_OUT,           authModel.signOut);
    sub(TOPICS.DELETE_USER,        authModel.deleteAuthUser);

  // Errors
    sub(TOPICS.ERROR_SIGNING_IN, () => {
      pub(TOPICS.MENU_NAV, { navTo: menu.pages.errorSigningIn });
    });
    sub(TOPICS.ERROR_CREATING_USER, () => {
      pub(TOPICS.MENU_NAV, { navTo: menu.pages.errorCreatingUser });
    });

  // Example upload
    sub(TOPICS.SUBMIT_UPLOAD, longan.handleFileUpload);
}