import React, { useState } from "react";
import firebaseApp from "./utils/firebase";
import { getAuth } from "firebase/auth";
import { ToastContainer } from 'react-toastify';

import Auth from "./pages/Auth";
import LoggedLayout from "./layouts/LoggedLayout/LoggedLayout";

const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  auth.onAuthStateChanged(currentUser => {
    console.log(currentUser);
    if (!currentUser?.emailVerified) {
      auth.signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }

    setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }

  return (
    <>
      {!user ? <Auth /> : <LoggedLayout user={user} />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}



export default App;
