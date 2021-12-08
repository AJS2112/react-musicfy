import React from "react";
import firebaseApp from "./utils/firebase";
import { getAuth } from "firebase/auth";

function App() {
  const auth = getAuth(firebaseApp);
  auth.onAuthStateChanged(currentUser => {
    console.log(currentUser ? "Estamos Logeados" : "No estamos logeados");
  })
  return (
    <div className="App">
      <h1>Musicfy</h1>
    </div>
  );
}

export default App;
