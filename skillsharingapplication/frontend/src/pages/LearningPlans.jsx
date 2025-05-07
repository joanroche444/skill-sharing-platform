import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function LearningPlans() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    api.get('/learning-plans').then(res => setPlans(res.data));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this learning plan?')) {
      try {
        await api.delete(`/learning-plans/${id}`);
        fetchPlans();
      } catch {
        alert('Failed to delete the plan.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-plan/${id}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">All Learning Plans</h2>
      <ul className="space-y-6 flex flex-col items-center">
        {plans.map(plan => (
          <li
            key={plan.id}
            className="bg-white border border-gray-300 p-6 rounded-lg shadow hover:shadow-lg transition duration-200 w-full max-w-2xl"
          >
            <h3 className="text-2xl font-semibold text-blue-700">{plan.title}</h3>
            <p className="text-gray-600 mt-2">{plan.description}</p>
            <div className="text-sm text-gray-500 mt-1 italic">
              {plan.skill} | {plan.learningPeriodInDays} days
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleEdit(plan.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(plan.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
