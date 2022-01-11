import firebaseApp from "./firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, EmailAuthProvider, EmailAuthCredential, reauthenticateWithCredential } from "firebase/auth";

export async function isUserAdmin(uid) {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "admins", uid);
    const response = await getDoc(docRef);
    return response.exists();
}

export const reauthenticate = password => {

    const auth = getAuth();
    const user = auth.currentUser;

    const provider = EmailAuthProvider;
    const credential = provider.credential(user.email, password);

    return reauthenticateWithCredential(user, credential);

}