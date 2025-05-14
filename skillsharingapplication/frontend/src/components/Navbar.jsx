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
    <nav className="bg-gray-200 shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo */}
      <Link to="/home" className="text-3xl font-bold text-blue-600">
        TalentHive
      </Link>

      {/* Center: Nav Links */}
      <div className="flex gap-4 justify-center flex-1">
        {navLink("/home", "Home")}
        {navLink("/create-post", "Create Post")}
        {navLink("/plans", "Learning Plans")}
        {navLink("/create-plan", "Create Plan")}
        {navLink("/progress", "Progress Updates")}
        {navLink("/create-progress", "New Progress Update")}
      </div>

      {/* Right: Profile Icon */}
      <div className="ml-auto">
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">
          <UserCircle size={30} />
        </Link>
      </div>
    </nav>
  );
}
