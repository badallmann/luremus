import { html } from "/shared/html.js";
import { css }  from "/shared/old-utils.js";

export function halvorhansen() {
  document.body.append(
    html.create('h1', {}, 'Lars'),
    html.create('img', { src: '/assets/lars.jpg'})
  );
}