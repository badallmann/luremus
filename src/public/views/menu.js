import { auth }        from '/firebase/init-services.js';
import { auth }        from '/firebase/init-services.js';
import { authModel }   from '/firebase/auth-model.js';
import { TOPICS }      from '/shared/topics.js';
import { html }        from '/shared/html.js';

function navButton(text, menuPage) {
  return html.pubButton(text, TOPICS.MENU_NAV, { navTo: menuPage })
function navButton(text, menuPage) {
  return html.pubButton(text, TOPICS.MENU_NAV, { navTo: menuPage })
}

function backButton() {
  return html.pubButton('←Back', TOPICS.MENU_NAV_BACK)
}

function resetButton() {
  return html.pubButton('←Back to main menu', TOPICS.MENU_NAV_RESET)
}

const pages = {
  signedOut() {
    return [
      authModel.wasSignedInEarlier ? html.p('Signed out') : '',
      navButton('Sign in', menu.pages.signIn),
      navButton('Create user', menu.pages.createUser),
      navButton('About', menu.pages.about)
      navButton('Sign in', menu.pages.signIn),
      navButton('Create user', menu.pages.createUser),
      navButton('About', menu.pages.about)
    ];
  },
  signIn() {
    return [
      backButton(),
      backButton(),
      html.p('Sign in:'),
      html.form(TOPICS.SUBMIT_SIGN_IN, [
        html.emailInput(),
        html.passwordInput(),
        html.submitButton()
        html.submitButton()
      ]),
    ];
  },
  createUser() {
    return [
      backButton(),
      backButton(),
      html.p('Snublr is indev and currently not accepting new users.')
      // html.p('Create user:'),
      // html.form(TOPICS.SUBMIT_CREATE_USER, [
      //   html.emailInput(),
      //   html.passwordInputStopAutocomplete(),
      //   html.submitButton()
      //   html.submitButton()
      // ])
    ];
  },
  about() {
    return [
      backButton(),
      backButton(),
      html.p('About Snublr...')
    ];
  },
  errorSigningIn() {
    return [
      backButton(),
      backButton(),
      html.p('Error:'),
      html.p('Something went wrong. Please try again.'),
    ];
  },
  errorCreatingUser() {
    return [
      backButton(),
      backButton(),
      html.p('Error:'),
      html.p('Something went wrong. Please try again.'),
    ];
  },
  signedIn() {
    return [
      html.p('Signed in as ', html.em(auth.currentUser.email)),
      navButton('Example upload', menu.pages.exampleUpload),
      navButton('Settings', menu.pages.settings),
      html.pubButton('Sign out', TOPICS.SIGN_OUT),
      navButton('Example upload', menu.pages.exampleUpload),
      navButton('Settings', menu.pages.settings),
      html.pubButton('Sign out', TOPICS.SIGN_OUT),
    ];
  },
  settings() {
    return [
      backButton(),
      backButton(),
      html.p('Settings:'),
      navButton('Delete user…', menu.pages.askConfirmDeleteUser),
      navButton('Delete user…', menu.pages.askConfirmDeleteUser),
    ];
  },
  askConfirmDeleteUser() {
    // ! Requires recent sign in. Deletes only auth. Do not make deletion easy in production, ask ppl to email me instead
    // ! Requires recent sign in. Deletes only auth. Do not make deletion easy in production, ask ppl to email me instead
    return [
      resetButton(),
      html.p('Delete user:'),
      html.p('Are you sure?'),
      html.p('(Deletion will not be that easy in production)'),
      html.pubButton('Confirm delete user', TOPICS.DELETE_USER)
    ];
  },
  exampleUpload() {
    // returns { input, button, fileCountDisplay, submitButton, dropArea };
    const u = html.upload();

    u.dropArea.textContent = 'dropArea'

    return [
      backButton(),
      backButton(),
      html.form(TOPICS.SUBMIT_UPLOAD, [
        u.input,
        u.button,
        u.fileCountDisplay,
        u.submitButton
      ])
    ];
  },
}

export const menu = {
  pages,
  element: html.create('div', { 'class': 'menu' }),
  navHistory: [],

  make() {
    document.body.appendChild(menu.element);
    // Might conflict with current implementation waiting for auth state change
    this.update(menu.pages.signedOut);
  },

  update(page) {
    if ([menu.pages.signedIn, menu.pages.signedOut].includes(page)) {
      menu.navHistory = [];
    }
    const content = page();
    menu.element.replaceChildren(...content);
    menu.navHistory.push(page);
  },

  navigateBack() {
    menu.navHistory.pop();
    const page = menu.navHistory.pop();
    menu.update(page);
  },

  navigateReset() {
    menu.navHistory = menu.navHistory.slice(0, 1);
    const page = menu.navHistory.pop();
    menu.update(page);
  }
}