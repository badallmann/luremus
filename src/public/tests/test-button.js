/* Dogma for buttons
 * create button
 * placement of button in DOM
 * lister to click
 * pub action when clicked
 * sub to same message, typically in another file, loosely coupled
 * action for sub
 *   ^may include multiple actions
*/

import { html } from '../shared/html.js'
import { pub, sub } from '/shared/pubsub.js'
import { css } from '/shared/misc.js'

export function testButton() {
  // first btn
  const a = html.button('stay == false', e => {
    pub('a click', { eventObject: e })
  })
  sub('a click', data => {
    alert('eventObject: ' + data.eventObject)
  })

  // second btn
  const b = html.button('stay == true', e => {
    pub('b click', { eventObject: e })
  }, true)
  sub('b click', data => {
    alert('eventObject: ' + data.eventObject)
  })

  // DOM
  document.body.append(a, b)
  css(`
    button {
      display: block;
      margin: 1rem;
    }
  `)
}