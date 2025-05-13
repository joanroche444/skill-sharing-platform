import { useEffect, useState } from 'react';
import api from '../api/api';

export default function ProgressUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = () => {
    api.get('/learning-progress').then(res => setUpdates(res.data));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      await api.delete(`/learning-progress/${id}`);
      fetchUpdates(); // Refresh after delete
    }
  };

  return (
    <div className="py-10 flex justify-center bg-gray-100 px-7 min-h-screen">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Learning Progress Updates</h2>
        {updates.map((update) => (
          <div key={update.id} className="bg-white shadow-lg rounded-lg p-6 mb-6 relative">
            <h3 className="text-2xl font-bold text-blue-400 mb-2">{update.title}</h3>
            <p className="text-gray-700 mb-2">{update.description}</p>
            <small className="text-gray-500">{new Date(update.createdAt).toLocaleString()}</small>
            <button
              onClick={() => handleDelete(update.id)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
