import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function uploadProfilePicture() {
  const fileInput = document.getElementById('profilePicInput');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image first.");
    return;
  }

  // Initialize Firebase storage reference
  const storage = getStorage();
  const storageRef = ref(storage, `profilePictures/${file.name}`);

  try {
    // Upload the file
    await uploadBytes(storageRef, file);
    alert("Image uploaded successfully.");

    // Get and display the download URL
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Image URL:", downloadURL);
    // Optionally, save this URL in Firestore or your user's profile
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}