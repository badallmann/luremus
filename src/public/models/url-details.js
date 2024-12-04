function getURLdetails() {
  const url = new URL(window.location.href);
  const hostnameParts = url.hostname.split('.');
  const apexDomain = hostnameParts.slice(-2).join('.');
  const subdomain = hostnameParts.length > 2 ? hostnameParts[0] : '';
  const trailingPath = url.pathname;
  const cleanUrl = `${url.protocol}//${subdomain ? `${subdomain}.` : ''}${apexDomain}`;

  const obj = { subdomain, apexDomain, trailingPath, cleanUrl };
  console.log(obj);
  
  return obj;
}

// { subdomain, apexDomain, trailingPath, cleanUrl }
export const urlDetails = getURLdetails();

export function getEnvironment() {
  if (urlDetails.apexDomain === 'snublr.net') { 
    return 'production';
  } else {
    return 'development';
  }
}