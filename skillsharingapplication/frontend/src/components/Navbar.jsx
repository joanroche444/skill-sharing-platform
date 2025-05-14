// src/components/NavBar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function NavBar() {
  const { pathname } = useLocation();

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded transition duration-200 ${
        pathname === to
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50">
      <div className="flex items-left mb-2 md:mb-0">
        <Link to="/home" className="text-3xl font-bold text-blue-600">
          SkillShare
        </Link>
      </div>

      <div className="flex flex-wrap justify-left md:justify-end items-center gap-4">
        {navLink("/home", "Home")}
        {navLink("/create-post", "Create Post")}
        {navLink("/plans", "Learning Plans")}
        {navLink("/create-plan", "Create Plan")}
        {navLink("/progress", "Progress Updates")}
        {navLink("/create-progress", "Update Progress")}
        {navLink("/notifications", "Notifications")}
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">
          <UserCircle size={24} />
        </Link>
      </div>
    </nav>
  );
}
