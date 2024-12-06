import { db } from '/models/firebase-services.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';

// Add data
async function addUser() {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: 'John Doe',
      age: 25,
      city: 'New York'
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Read
async function getUsers() {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
}

// Update
async function updateUser() {
  const userRef = doc(db, 'users', 'document-id');
  await updateDoc(userRef, {
    age: 26
  });
  console.log("Document updated");
}

// Delete
async function deleteUser() {
  const userRef = doc(db, 'users', 'document-id');
  await deleteDoc(userRef);
  console.log("Document deleted");
}