import { coupleTopics }          from "/controllers/couplings.js";
import { initializeFirebaseSDK } from "/models/firebase-services.js";
import { authModel }             from "/models/auth-model.js";
import { getEnvironment }        from "/models/url-details.js";
import { renderBasedOnSubdomain, testWithSubdomain } from "/models/subdomain-handling.js"
import { renderPortal }          from '/views/portal.js'

function firebase() {
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