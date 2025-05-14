// components/ui/Button.jsx
import React from "react";

export function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
  const baseStyle = "inline-block px-4 py-2 rounded-xl font-medium text-sm transition duration-200";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
