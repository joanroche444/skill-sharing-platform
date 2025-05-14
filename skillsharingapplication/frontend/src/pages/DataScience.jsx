import React from "react";

export default function DataSciencePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-4xl text-center font-bold text-blue-600 mb-4">Data Science</h1>
        <p className="text-gray-700 text-lg mb-6">
          Dive into data analytics, statistical modeling, and machine learning to unlock insights from data.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
          <li>Python for Data Science: NumPy, Pandas, and Scikit-learn</li>
          <li>Data wrangling and cleaning techniques</li>
          <li>Exploratory Data Analysis (EDA) and visualization</li>
          <li>Machine Learning algorithms and evaluation</li>
          <li>Real-world datasets and project building</li>
          <li>Introduction to deep learning with TensorFlow or PyTorch</li>
        </ul>
        <div className="text-sm text-gray-500">Ideal for: Analysts, Statisticians, Aspiring ML Engineers</div>
      </div>
    </div>
  );
}
