import { pub, sub, unsub, inspect } from "/shared/pubsub.js"
import { html } from '../shared/html.js'
import { ba } from '/shared/misc.js'

export function testPubButton() {
  // trigger
  ba(html.pubButton('pubButton', 'psst'))

  // causation
  sub('psst', data => {
    console.log('Click!')
  }, true)
}