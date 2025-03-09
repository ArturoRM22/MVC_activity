import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { User } from "./types";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("User found in local storage:", JSON.parse(storedUser));
      setUser(JSON.parse(storedUser));
    } else {
      console.log("No user found in local storage.");
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Route for login */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" /> // Redirect to dashboard if user is already logged in
            ) : (
              <Login setUser={setUser} /> // Show login page if no user is logged in
            )
          }
        />
        {/* Route for dashboard */}
        <Route
          path="/*"
          element={
            user ? (
              <Dashboard user={user} /> // Show dashboard if user is logged in
            ) : (
              <Navigate to="/login" /> // Redirect to login if no user is logged in
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;