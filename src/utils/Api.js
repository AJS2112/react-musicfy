import firebaseApp from "./firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export async function isUserAdmin(uid) {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "admins", uid);
    const response = await getDoc(docRef);
    return response.exists();
}