import { getURLdetails } from "/shared/utils.js";

// { subdomain, apexDomain, trailingPath, cleanUrl }
export const urlDetails = getURLdetails();

export function getEnvironment() {
  if (urlDetails.apexDomain === 'snublr.net') { 
    return 'production';
  } else {
    return 'development';
  }
}