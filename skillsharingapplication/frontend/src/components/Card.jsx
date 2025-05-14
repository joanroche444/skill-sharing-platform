// components/ui/Card.jsx
import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-white shadow-sm border border-gray-200 p-5 hover:shadow-md transition duration-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`text-gray-800 ${className}`}>
      {children}
    </div>
  );
}
