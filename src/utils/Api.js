import { initializeApp } from "firebase/app";
import firebaseApp from "./firebase";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import { collection, getDocs } from "firebase/firestore";

export async function isUserAdmin(uid) {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "admins", uid);
    const response = await getDoc(docRef);
    return response.exists();
}