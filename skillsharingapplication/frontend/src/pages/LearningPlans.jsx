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
    <div className="p-10 bg-gray-100 min-h-screen">
  <h2 className="text-4xl font-bold mb-10 text-gray-800 text-center"> All Learning Plans</h2>
  <ul className="space-y-8 flex flex-col items-center">
    {plans.map(plan => (
      <li
        key={plan.id}
        className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-3xl"
      >
        <h3 className="text-3xl font-bold text-blue-400 mb-2">{plan.title}</h3>
        <p className="text-gray-700 text-lg mb-3">{plan.description}</p>
        
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-5">
          <span className="bg-blue-50 text-blue-700 font-medium px-3 py-1 rounded-full border border-blue-200">
            {plan.skill}
          </span>
          <span className="bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full border border-green-200">
            {plan.learningPeriodInDays} days
          </span>
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={() => handleEdit(plan.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition"
          >
             Edit
          </button>
          <button
            onClick={() => handleDelete(plan.id)}
            className="bg-red-500 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition"
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
