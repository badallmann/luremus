import { storage } from '/models/firebase-services.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js';

// # Upload

// Referanse til lagring
const storageRef = ref(storage, 'uploads/filnavn.jpg');

// Velg fil og last opp
const uploadFile = async (file) => {
  try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      console.log('Fil lastet opp. URL:', url);
  } catch (error) {
      console.error('Feil ved opplasting:', error);
  }
};

// # Download
const getFileURL = async () => {
  try {
      const url = await getDownloadURL(storageRef);
      console.log('Nedlastings-URL:', url);
  } catch (error) {
      console.error('Feil ved henting av URL:', error);
  }
};

// # Delete
const deleteFile = async () => {
  try {
      await deleteObject(storageRef);
      console.log('Fil slettet.');
  } catch (error) {
      console.error('Feil ved sletting:', error);
  }
};