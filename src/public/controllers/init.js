import { renderBasedOnSubdomain, testWithSubdomain } from "/models/subdomain-handling.js"
import { initializeFirebaseSDK } from "/firebase/init-services.js";
import { getEnvironment } from "/models/url-details.js";
import { coupleTopics } from "/controllers/couplings.js";
import { renderPortal } from '/views/portal.js'
import { authModel } from "/firebase/auth-model.js";

const firebaseMasterSwitch = true;

function firebase() {
  if (! firebaseMasterSwitch) return;
  initializeFirebaseSDK();
  authModel.observeAuthStateChanges();
}

function production() {
  console.log('Production environment');

  firebase();
  renderBasedOnSubdomain();
}

function development() {
  console.log('Development environment');

  firebase();
  renderPortal();
  //testWithSubdomain('baslak');
}

function always() {
  coupleTopics();
}

export function init() {
  if (getEnvironment() === 'production') {
    production();
  } else {
    development();
  }

  always();
}