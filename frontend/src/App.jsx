import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
function App() {
  

  return (
   <Router>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
   </Router>
  );
}

export default App;