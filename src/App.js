import React, { useState } from "react";
import firebaseApp from "./utils/firebase";
import { getAuth } from "firebase/auth";

import Auth from "./pages/Auth";

const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  auth.onAuthStateChanged(currentUser => {
    if (!currentUser) {
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
    !user ? <Auth /> : <UserLogged />
  );
}

function UserLogged() {
  const logout = () => {
    auth.signOut();
  }
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100vh" }}>
      <h1>Usuario Logeado</h1>
      <button onClick={logout}>Cerrar</button>
    </div>
  )
}

export default App;
