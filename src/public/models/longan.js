import { TOPICS } from '/shared/topics.js';
import { pub, sub } from '/shared/pubsub.js';
import { getFormData } from '/shared/utils.js';

// API for media file handling. Files have meta data
// Import db and storage models, or use services directly
// See API sketch in Freeform

export const longan = {
  handleFileUpload
};

function handleFileUpload(data) {
  const result = getFormData(data.formData);
  
  if (result.files && result.files[0].name !== '') {
    const filenames = result.files.map(file => file.name).join(', ');
    console.log('File(s) found:', filenames);
    alert('File(s) found: ' + filenames);
  } else {
    console.log('No files to upload');
  }
}