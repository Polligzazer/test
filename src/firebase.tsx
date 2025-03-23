import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  fetchSignInMethodsForEmail, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updatePassword,
  verifyPasswordResetCode 
} from "firebase/auth";
import { 
  getFirestore, 
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where, 
} from "firebase/firestore";

// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC_FLCIBWdReqRPmWFZB1L_4rhLntNWuyA",
    authDomain: "message-4138f.firebaseapp.com",
    projectId: "message-4138f",
    storageBucket: "message-4138f.firebasestorage.app",
    messagingSenderId: "197072020008",
    appId: "1:197072020008:web:e0676251a0d313260dcb1d",
    measurementId: "G-GD15C1MZW2"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export {
   auth, 
   createUserWithEmailAndPassword, 
   signInWithEmailAndPassword, 
  sendEmailVerification, 
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updatePassword,
  verifyPasswordResetCode 
};

export const reportLostItem = async (
  userId: string,
  item: string,
  category: string,
  description: string,
  location: string,
  date: string,
  // imageFile: File
) => {
  try {
    // Upload image to Firebase Storage
    // const storageRef = ref(storage, `lost_items/${imageFile.name}`);
    // await uploadBytes(storageRef, imageFile);
    // const imageUrl = await getDownloadURL(storageRef);

    // Save report in Firestore
    const docRef = await addDoc(collection(db, "lost_items"), {
      userId,
      item,
      category,
      description,
      location,
      date,
      // imageUrl,
      status: "pending", // Default status
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error reporting lost item:", error);
    throw error;
  }
};

// Fetch pending reports for admin
export const getPendingReports = async () => {
  const q = query(collection(db, "lost_items"), where("status", "==", "pending"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Admin approval/rejection function
export const reviewLostItem = async (
  reportId: string,
  approve: boolean,
  userId: string
) => {
  try {
    const docRef = doc(db, "lost_items", reportId);
    await updateDoc(docRef, {
      status: approve ? "approved" : "denied",
    });

    // Notify user (Assuming there's a 'notifications' collection)
    await addDoc(collection(db, "notifications"), {
      userId,
      message: approve
        ? "Your lost item report has been approved and is now public."
        : "Your lost item report has been denied.",
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating report status:", error);
    throw error;
  }
};

// Fetch approved reports for the feed
export const getApprovedReports = async () => {
  const q = query(collection(db, "lost_items"), where("status", "==", "approved"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Claimed report fetching
export const getClaimedReports = async () => {
  const q = query(collection(db, "lost_items"), where("status", "==", "claimed"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const claimLostItem = async (reportId: string, userId: string) => {
  try {
    const docRef = doc(db, "lost_items", reportId);
    await updateDoc(docRef, {
      status: "claimed",
      claimedBy: userId,
    });
  } catch (error) {
    console.error("Error claiming lost item:", error);
    throw error;
  }
};

