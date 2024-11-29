// Test

import { pub, sub, unsub, inspect } from "/shared/pubsub.js"

export function testPubsub() {
  const s1 = sub('sex', data => {
    console.log(`Ahh! Type: ${data.type}`)
  }, true);
  console.log(inspect());
  pub('sex', { type: 'threesome' });
  unsub (s1);
}

// prevents recursivity if once === true
// the oldest sub is runs first, and if it unsubs another, it will be not run afterwards (live changes to the action list)