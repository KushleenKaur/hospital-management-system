import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("isLoggedIn") === "true"
);
  const [user, setUser] = useState(null);
  

  return (
    <div>
      
      {isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} user={user} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      )}
      <div className="footer">
  <p>© 2026 Vishal Mega Hospital | Developed by Kushleen Kaur</p>
</div>
    </div>
    
  );
}

export default App;