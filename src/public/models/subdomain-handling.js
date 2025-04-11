import { urlDetails }   from "/models/url-handling.js";
import { renderPortal } from "/views/portal.js"
import { baslak }       from "/tests/baslak.js";
import { halvorhansen } from "/tests/halvorhansen.js";

function renderSubdomainContent(subdomain) {
  console.log(`Rendering content @ subdomain: ${subdomain}`);
  
  switch (subdomain) {
    case 'baslak':
      baslak();
      break;
    case 'halvorhansen':
      halvorhansen();
      break;
    default:
      console.log('Error: No content found');
  }
}

function doesSubdomainExist(subdomain) {
  const existingSubdomains = ['baslak', 'halvorhansen'];
  return existingSubdomains.includes(subdomain);
}

function handleSubdomain() {
  const s = urlDetails.subdomain;

  if (doesSubdomainExist(s)) renderSubdomainContent(s);
  else console.log(
    'Subdomain does not exist' +
    '(production: provide link to portal)'
  );
}

export function renderBasedOnSubdomain() {
  if (urlDetails.subdomain) {
    handleSubdomain();
  } else {
    renderPortal();
  }
}

export function testWithSubdomain(subdomain) {
  if (doesSubdomainExist(subdomain)) {
    console.log('Subdomain exists and will render');
    setTimeout(() => {
      document.body.replaceChildren();
      renderSubdomainContent(subdomain);
    }, 0);
  } else {
    console.log('Subdomain does not exist');
  }
}