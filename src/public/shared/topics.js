export const TOPICS = Object.fromEntries([

  // Menu navigation
  'MENU_NAV',
  'MENU_NAV_BACK',
  'MENU_NAV_RESET',

  // Auth state
  'AUTH_STATE_CHANGE_SIGNED_OUT',
  'AUTH_STATE_CHANGE_SIGNED_IN',

  // Auth actions
  'SUBMIT_SIGN_IN',
  'SUBMIT_CREATE_USER',
  'SIGN_OUT',
  'DELETE_USER',

  // Auth errors
  'ERROR_SIGNING_IN',
  'ERROR_CREATING_USER',

  // Upload
  'SUBMIT_UPLOAD',

].map(key => [key, key]));