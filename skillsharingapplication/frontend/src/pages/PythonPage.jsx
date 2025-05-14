import React from "react";

export default function PythonPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-4xl text-center font-bold text-blue-600 mb-4">Python Programming</h1>
        <p className="text-gray-700 text-lg mb-6">
          Learn Python from the ground up — from syntax and variables to object-oriented programming and real-world projects.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
          <li>Introduction to Python syntax and semantics</li>
          <li>Control structures, functions, and modules</li>
          <li>Working with files and exception handling</li>
          <li>Object-Oriented Programming (OOP)</li>
          <li>Using libraries like NumPy, Pandas, and Matplotlib</li>
          <li>Building web apps using Flask or Django</li>
        </ul>
        <div className="text-sm text-gray-500">Ideal for: Beginners, Automation Engineers, Aspiring Data Scientists</div>
      </div>
    </div>
  );
}
