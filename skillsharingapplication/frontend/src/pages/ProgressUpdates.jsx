import { useEffect, useState } from 'react';
import api from '../api/api';

export default function ProgressUpdates() {
  const [updates, setUpdates] = useState([]);
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUpdates();
    fetchPlans();
  }, []);

  const fetchUpdates = async () => {
    try {
      const res = await api.get('/learning-progress');
      setUpdates(res.data);
    } catch {
      alert('Failed to fetch progress updates.');
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await api.get('/learning-plans');
      setPlans(res.data);
    } catch {
      alert('Failed to fetch plans.');
    }
  };

  const getPlanTitle = (planId) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.title : 'Unknown Learning Plan';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this progress update?')) {
      try {
        await api.delete(`/learning-progress/${id}`);
        fetchUpdates();
      } catch {
        alert('Failed to delete update.');
      }
    }
  };

  const filteredUpdates = updates.filter(update => {
    const term = searchTerm.toLowerCase();
    const planTitle = getPlanTitle(update.learningPlanId).toLowerCase();
    return (
      update.title.toLowerCase().includes(term) ||
      update.description.toLowerCase().includes(term) ||
      planTitle.includes(term)
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">
           Learning Progress Updates
        </h2>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by title, plan, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Updates List */}
        {filteredUpdates.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No updates found.</p>
        ) : (
          filteredUpdates.map((update) => (
            <div
              key={update.id}
              className="bg-white rounded-2xl p-6 mb-6 shadow hover:shadow-lg transition-all duration-200 relative border border-gray-200"
            >
              {/* Title */}
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">{update.title}</h3>

              {/* Plan Name */}
              <p className="text-gray-500 text-sm mb-3">
                <strong className="font-medium text-gray-700">Plan:</strong> {getPlanTitle(update.learningPlanId)}
              </p>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-4">{update.description}</p>

              {/* Timestamp */}
              <p className="text-sm text-gray-400 italic">
                {new Date(update.createdAt).toLocaleString()}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(update.id)}
                className="absolute top-5 right-5 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
