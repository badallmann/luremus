import { TOPICS } from '/shared/constants.js';
import { html }   from '/shared/html.js';
import { auth } from '/models/firebase-services.js';

// Button text
const back = '←Back'

const pages = {
  signedOut(wasSignedInEarlier) {
    return [
      wasSignedInEarlier ? html.p('Signed out') : '',
      html.pubButton('Sign in', TOPICS.NAVIGATE_SIGN_IN),
      html.pubButton('Create user', TOPICS.NAVIGATE_CREATE_USER)
    ];
  },
  signIn() {
    return [
      html.p('Sign in:'),
      html.form(TOPICS.SUBMIT_SIGN_IN, [
        html.emailInput(),
        html.passwordInput(),
        html.submitButton('Submit')
      ]),
      html.pubButton(back, TOPICS.NAVIGATE_SIGNED_OUT)
    ];
  },
  createUser() {
    return [
      html.p('Create user:'),
      html.form(TOPICS.SUBMIT_CREATE_USER, [
        html.emailInput(),
        html.passwordInputStopAutocomplete(),
        html.submitButton('Submit')
      ]),
      html.pubButton(back, TOPICS.NAVIGATE_SIGNED_OUT)
    ];
  },
  errorSigningIn() {
    return [
      html.p('Something went wrong. Please try again.'),
      html.pubButton(back, TOPICS.NAVIGATE_SIGN_IN)
    ];
  },
  errorCreatingUser() {
    return [
      html.p('Something went wrong. Please try again.'),
      html.pubButton(back, TOPICS.NAVIGATE_CREATE_USER)
    ];
  },
  signedIn() {
    return [
      html.p('Signed in as ', html.em(auth.currentUser.email)),
      html.pubButton('Sign out', TOPICS.SIGN_OUT),
      html.pubButton('Delete user…', TOPICS.ASK_CONFIRM_DELETE_USER)
    ];
  },
  confirmDeleteUser() {
    return [
      html.p('Are you sure?'),
      html.pubButton(back, TOPICS.NAVIGATE_SIGNED_IN),
      html.br(), html.br(), html.br(), html.br(), html.br(),
      html.pubButton('Confirm delete user', TOPICS.DELETE_USER)
    ]
  }
}

export const menu = {
  pages,

  element: html.create('div', { 'class': 'menu' }),

  show() {
    document.body.appendChild(menu.element);
  },

  update(page, ...params) {
    menu.element.replaceChildren(...page(...params));
  }
}