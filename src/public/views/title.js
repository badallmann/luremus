import { html } from "/shared/html.js";

export function title() {
  document.body.appendChild(html.create('h1', {}, 'Snublr'));
}