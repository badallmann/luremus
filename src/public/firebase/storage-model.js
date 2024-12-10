import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';




// Suggested

export async function uploadFile(file, path = 'uploads', metadata = {}) {
  const storageRef = ref(storage, `${path}/${file.name}`);
  const uploadSnapshot = await uploadBytes(storageRef, file, metadata);
  const downloadURL = await getDownloadURL(uploadSnapshot.ref);

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    downloadURL,
    path: `${path}/${file.name}`
  };
}

export async function saveMetadata(fileData, collectionName = 'files') {
  const collectionRef = collection(firestore, collectionName);

  const docRef = await addDoc(collectionRef, {
    ...fileData,
    uploadedAt: new Date().toISOString()
  });

  return { id: docRef.id, ...fileData };
}

export function generatePath(file, basePath = 'uploads') {
  const timestamp = Date.now();
  return `${basePath}/${timestamp}_${file.name}`;
}

export function validateFile(file, maxSizeMB = 5) {
  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(`File ${file.name} exceeds the maximum size of ${maxSizeMB}MB.`);
  }
}

export function logError(error, context = '') {
  console.error(`Error in ${context}:`, error);
  // Optionally, send logs to a monitoring service like Sentry.
}



