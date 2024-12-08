import { addStylesheets } from "/shared/misc.js";
import { init }           from "/controllers/init.js";

window.onload = function() {
  addStylesheets(
    '/style/normalize.css',
    '/style/color.css',
    '/style/design-choices.css',
    '/style/draft.css',
  );
  init();
}
