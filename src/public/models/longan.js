import { TOPICS } from '/shared/topics.js';
import { pub, sub } from '/shared/pubsub.js';
import { getFormData } from '/shared/utils.js';

import { TOPICS } from '/shared/topics.js';
import { pub, sub } from '/shared/pubsub.js';
import { getFormData } from '/shared/utils.js';

// API for media file handling. Files have meta data
// Import db and storage models, or use services directly
// See API sketch in Freeform
// See API sketch in Freeform

export const longan = {
  handleFileUpload
};




/*

// Utils



const fileTypes = {
  images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
  videos: ['mp4', 'mkv', 'mov', 'avi', 'webm'],
  documents: ['pdf', 'doc', 'docx', 'txt', 'xlsx'],
  audio: ['mp3', 'wav', 'ogg'],
};

function decideUploadType(fileName) {
  if (!fileName) {
    throw new Error("File name is required.");
  }

  const fileExtension = fileName.split('.').pop().toLowerCase();

  const type = Object.keys(fileTypes).find(type => fileTypes[type].includes(fileExtension));

  return type || 'others';
}







// indev
function storagePathMaker() {
  const user = auth.currentUser;
  const userID = user.uid;
  const uploadType = decideUploadType(fileName);
  // ...
  const imagesPath = `users/${userID}/uploads/${uploadType}/originals`;
}

// metadata location
const dbPath = `users/${userID}/uploadIndexes`;

// upon creating new users
 // Set the document with an empty metadataArray for new users
 await setDoc(docRef, {
  metadataArray: [] // Initialize the metadataArray as an empty array
});




// Suggested

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

async function saveFileMetadata(fileData) {
  const filesCollection = collection(firestore, 'uploadedFiles');

  const docRef = await addDoc(filesCollection, {
    name: fileData.name,
    size: fileData.size,
    type: fileData.type,
    downloadURL: fileData.downloadURL,
    uploadedAt: new Date().toISOString()
  });

  return {
    id: docRef.id,
    ...fileData
  };
}

async function uploadFileToStorage(file) {
  const storageRef = ref(storage, `uploads/${file.name}`);  // users/{userID}/uploads/images/originals
  
  const uploadSnapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(uploadSnapshot.ref);

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    downloadURL
  };
}

function handleFiles2(files) {
  files.forEach(async (file) => {
    try {
      const uploadData = await uploadFileToStorage(file);
      console.log('File uploaded:', uploadData);
      
      const metadata = await saveFileMetadata(uploadData);
      console.log('File metadata saved:', metadata);
    } catch (error) {
      console.error('Error handling file:', file.name, error);
    }
  });
}

*/









// Complete

// other: workflows for browsing, viewing, sharing, deletion (complete, including metadata and all file types)

function logFileNames(fileObjArr) {
  const filenames = fileObjArr.map(file => file.name).join(', ');
  console.log('File(s):', filenames);
}

function handleFiles(files) {
  logFileNames(files);
  return;

  // # Meta meta
  // Existing lib? uppy, Fine Uploader, dropzone, filepond
  // What does firebase provide already? Error handling?
  // ! Separate validation for practical reasons, vs for protecting against abuse
  //    Rules is ONLY protection
  //    Client side is the ONLY way to make the process practical

  // # Meta
  // Prioritize features + skip storage quotas/security
  // Always pubsub to interact w controller -> UI
  // Editor relation
  //   Could uploading always be done in it's own page?
  // Single vs multi file handling
  //   Single: Within editor, perhaps
  //   Multi: Withing portal
  // Most steps are common - make those common subroutines
  // Initially only care to support pictures
  // One by one vs all at once
  // What can be done in storage.rules to avoid consequences of abuse?
  // Catch errors and display

  // # Evaluation
  // Check if files are acceptible
  //   extension
  //   size
  //   Check storage usage
  // Else: Provide information and suggest further action
  
  // # Pre-processing (on device!)
  // duplicate check using hash
  // Preview using thumbnails?
  // Resize or compress
  // Evaluate post processing (size, )

  // # Pre-processing: Make other versions
  // Medium + thumbnails
  // Optinally store original (count towards user storage tier)

  // # Storage
  // Rename (UUID, all lowercase)
  const renamedFiles = renameFiles(files);
  // Store
  // Network speed timeout handling
  // Get access info

  // # Metadata
  // Build metadata
  //   Attach original name also

  // # Finish
  // Check storage usage
  // Check for file corruption (incomplete uploads, ) (checksum/hash, accessible)
  // File scan for viruses
  // Option to provide extra metadata (alt attr., tags)
  // Pub finish msg, button back to main menu

  // # Error
  // Erase all progress if cancelled
  // Make sure longan will still function, even if one bunch of uploads went to hell
}

function renameFiles(files) {
  // Assuming `someFilesArray` is an array of file objects
  return files.map(file => {
    // Extract and lowercase the extension
    const fileExtension = file.name.split('.').pop().toLowerCase(); 
    // Generate a new file name with UUID
    const newFileName = `${crypto.randomUUID()}.${fileExtension}`;
    // Create a new file with the new name
    return new File([file], newFileName, { type: file.type });
  });
}

function handleFileUpload(data) {
  const result = getFormData(data.formData);
  function anyFiles(result) {
    return result.files && result.files[0].name !== '';
  }
  if (anyFiles(result)) {
    const files = result.files;
    handleFiles(files);
  } else {
    console.log('No files to upload');
  }
}