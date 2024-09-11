// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Todo from "./components/Todo";
import APIPage from "./components/APIPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar /> {/* Display the Navbar at the top */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/todo" element={<PrivateRoute><Todo /></PrivateRoute>} />
          <Route path="/api" element={<PrivateRoute><APIPage /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
