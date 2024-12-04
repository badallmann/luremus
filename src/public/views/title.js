import { html } from "/shared/html.js";

export function makeTitle() {
  document.body.appendChild(html.create('h1', {}, 'Snublr.'));
}