import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore"; // Import Firestore functions

// Function to get items from Firestore
export async function getItems(userId) {
    const itemsCollection = collection(db, `users/${userId}/items`);
    const itemsSnapshot = await getDocs(itemsCollection);
    const items = itemsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  }
  
  // Function to add item to Firestore
  export async function addItem(userId, item) {
    const itemsCollection = collection(db, `users/${userId}/items`);
    const docRef = await addDoc(itemsCollection, item);
    return docRef.id; // Return the new document ID
  }