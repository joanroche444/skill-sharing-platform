import React from "react";

export default function WebDevPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-4xl text-center font-bold text-indigo-600 mb-4">Web Development</h1>
        <p className="text-gray-700 text-lg mb-6">
          Become a full-stack web developer by learning the core technologies of the web.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
          <li>HTML, CSS, and JavaScript fundamentals</li>
          <li>Responsive design using Tailwind CSS or Bootstrap</li>
          <li>Frontend frameworks: React, Vue, or Angular</li>
          <li>Backend basics with Node.js, Express</li>
          <li>Connecting with databases like MongoDB or PostgreSQL</li>
          <li>Deploying full-stack apps with Vercel or Heroku</li>
        </ul>
        <div className="text-sm text-gray-500">Ideal for: Beginners, Designers, Aspiring Full-Stack Developers</div>
      </div>
    </div>
  );
}
