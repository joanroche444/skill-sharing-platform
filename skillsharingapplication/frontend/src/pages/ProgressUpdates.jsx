import { useEffect, useState } from 'react';
import api from '../api/api';

export default function ProgressUpdates() {
  const [updates, setUpdates] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchUpdates();
    fetchPlans();
  }, []);

  const fetchUpdates = async () => {
    const res = await api.get('/learning-progress');
    setUpdates(res.data);
  };

  const fetchPlans = async () => {
    const res = await api.get('/learning-plans');
    setPlans(res.data);
  };

  const getPlanTitle = (planId) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.title : 'Unknown Learning Plan';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this progress update?')) {
      await api.delete(`/learning-progress/${id}`);
      fetchUpdates(); // Refresh the list
    }
  };

  return (
    <div className="py-10 flex justify-center bg-gray-100 px-7 min-h-screen">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Learning Progress Updates</h2>
        {updates.map((update) => (
          <div key={update.id} className="bg-white shadow-lg rounded-lg p-6 mb-6 relative">
            {/* Progress Update Title (Template) */}
            <h3 className="text-2xl font-bold text-blue-400 mb-1">{update.title}</h3>

            {/* Learning Plan Title */}
            <p className="text-1xl text-gray-500 mb-2">
              <strong>Learning Plan:</strong> {getPlanTitle(update.learningPlanId)}
            </p>

            {/* Progress Description */}
            <p className="text-gray-700 mb-2">{update.description}</p>

            {/* Timestamp */}
            <small className="text-gray-500">{new Date(update.createdAt).toLocaleString()}</small>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(update.id)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
