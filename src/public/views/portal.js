import { menu }      from "/views/menu.js";
import { makeTitle } from "/views/title.js";

export function renderPortal() {
  console.log('Rendering portal page');
  makeTitle();
  menu.make();
}