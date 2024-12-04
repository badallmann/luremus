import { html } from '../src/public/shared/html.js';
import { focus } from '/shared/utils.js';
import { pub, sub, unsub, inspect } from '/shared/pubsub.js';
import { ha, ba, bp, dqs, dqsa, css } from '/shared/misc.js';
import { auth } from '/firebase/firebase-services.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js'

export function maria() {
  // Menu assets
  let wasSignedIn = false;
  const menu = html.create('div', { 'class': 'menu' });
  const menuViews = {
    signedOut: function() {
      menu.replaceChildren()
      if (wasSignedIn) menu.append(html.p('Signed out.'))
      menu.append(
        html.funcButton('Sign in', menuViews.signInForm),
        html.funcButton('Join', menuViews.joinForm)
      );
    },
    signInForm: function() {
      const emailInput = html.emailField();
      const passwordInput = html.passwordField();
      const proceedButton = html.funcButton('Continue', async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        } catch (error) {
          menuViews.error(menuViews.signInForm);
        }
      });
      
      menu.replaceChildren(
        html.p('Sign in using the fields below.'),
        emailInput,
        passwordInput,
        proceedButton,
        html.funcButton('Back', menuViews.signedOut)
      )
      focus(emailInput)
      /* Sign in on hitting Enter key. Must remove listener somehow
        document.addEventListener('keyup', async e => {
          if (e.key === 'Enter') {
            await signin()
          }
        });
      */
    },
    joinForm: function() {
      const emailInput = html.emailField();
      const passwordInput = html.passwordField();
      const proceedButton = html.funcButton('Create this account', async () => {
        try {
          // create user
          throw new Error;
        } catch (error) {
          menuViews.error(menuViews.signInForm);
        }
      });
      
      menu.replaceChildren(
        html.p('Join by creating a new account using the fields below.'),
        emailInput,
        passwordInput,
        proceedButton,
        html.funcButton('Back', menuViews.signedOut)
      )
      focus(emailInput)
      /* Sign in on hitting Enter key. Must remove listener somehow
        document.addEventListener('keyup', async e => {
          if (e.key === 'Enter') {
            await signin()
          }
        });
      */
    },
    error: function(menuViewToReturnTo) {
      // menu.replaceChildren here too + back btn for simplicity of coding
      menu.replaceChildren(
        html.p('Something went wrong. Please try again.'),
        html.funcButton('Back', menuViewToReturnTo)
      )
    },
    signedIn: function() {
      menu.replaceChildren(
        html.p('Signed in as ', html.em(auth.currentUser.displayName), '.'),
        html.funcButton('Sign out', () => { signOut(auth); }),
        html.create('img', { src: '/assets/sample-image-1.jpg'}),
        'Her stopper koden.'
      )
    }
  }

  // External reactions
  sub('auth state change: signed out', menuViews.signedOut, true)
  sub('auth state change: signed in', () => {
    menuViews.signedIn();
    wasSignedIn = true;
  }, true)


   // Init
   ba(html.create('h1', {}, 'Klatremus'));
   ba(menu);
}