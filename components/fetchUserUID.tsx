import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../src/firebase"; // Adjust path if needed

const fetchUserUID = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid || "");
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          resolve(userData.uid); // Correctly fetches UID from Firestore
        } else {
          console.error("❗ User document not found in Firestore.");
          resolve(null);
        }
      } else {
        console.error("❗ User is not authenticated.");
        resolve(null);
      }
    });
  });
};

export default fetchUserUID;
