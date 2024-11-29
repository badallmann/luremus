import { app } from "/controllers/app.js";
import { halvorhansen } from "/tests/halvorhansen.js";
import { html } from "/shared/html.js";

let urlDetails;

function parseURL() {
  const url = new URL(window.location.href);
  const hostnameParts = url.hostname.split('.');

  // Assume apex domain is the last two segments
  const apexDomain = hostnameParts.slice(-2).join('.');
  
  // Extract the first subdomain (if it exists)
  const subdomain = hostnameParts.length > 2 ? hostnameParts[0] : '';

  const trailingPath = url.pathname;
  const cleanUrl = `${url.protocol}//${subdomain ? `${subdomain}.` : ''}${apexDomain}`;

  return { subdomain, apexDomain, trailingPath, cleanUrl };
}

function renderSubdomainContent(subdomain) {
  console.log(`Rendering content for subdomain: ${subdomain}`);
  
  if (subdomain === 'baslak') document.write('Baslak')
  if (subdomain === 'halvorhansen') halvorhansen();
}

function doesSubdomainExist(subdomain) {
  const existingSubdomains = ['baslak', 'halvorhansen'];
  return existingSubdomains.includes(subdomain);
}

function handleSubdomain() {
  if (doesSubdomainExist(urlDetails.subdomain)) {
    renderSubdomainContent(urlDetails.subdomain);
  } else {
    console.log('Subdomain does not exist (provide link to service)')
  }
}

function handleProduction() {
  console.log('Production Environment');

  // clean address bar somehow? in case path segments, multi lvl subdomains

  if (urlDetails.subdomain) {
    handleSubdomain()
  } else {
    service();
  }
}

function service() {
  console.log('Rendering service page');
  app();
}

function handleDevelopment() {
  console.log('Development Environment');
  service()
}

export function handleLanding() {
  urlDetails = parseURL();

  if (urlDetails.apexDomain === 'snublr.net') {
    handleProduction();
  } else {
    handleDevelopment();
  }
}

export function testWithSubdomain(subdomain) {
  if (doesSubdomainExist(subdomain)) {
    renderSubdomainContent(subdomain);
    console.log('Subdomain exists and was rendered');
  } else {
    console.log('Subdomain does not exist');
  }
}