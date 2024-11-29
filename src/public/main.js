import { init } from "/controllers/init.js";
import { testWithSubdomain } from "/controllers/landing.js";
import { addStylesheets } from "/shared/misc.js";

window.onload = function() {
  addStylesheets([
    '/style-old/normalize.css',
    '/style-old/color.css',
    '/style-old/menu.css',
    '/style/temp.css',
  ]);
  init();

  setTimeout(() => { testWithSubdomain('baslak') }, 0);

  document.body.appendChild(SC.widget)
}

window.testWithSubdomain = testWithSubdomain;