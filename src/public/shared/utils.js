export function getURLdetails() {
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

// When using forms, files can only be extracted as such
export function getFormData(formData) {
  const data = {};

  if (formData.has('email')) {
    data.email = formData.get('email');
  }

  if (formData.has('password')) {
    data.password = formData.get('password');
  }

  if (formData.has('files[]')) {
    const files = formData.getAll('files[]');
    // Check for zero selected files
    if (files[0].name !== '') {
      data.files = files;
    }
  }

  // Logs
  if (Object.keys(data).length > 0) {
    console.log('FormData fields returned:', Object.keys(data).join(', '));
  } else {
    console.log('No FormData fields found');
  }

  return data;
}