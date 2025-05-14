// components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-gray-600 text-sm py-4 mt-8">
      &copy; {new Date().getFullYear()} SkillShare Platform · Made with ❤️ by Team IT3030
    </footer>
  );
}
