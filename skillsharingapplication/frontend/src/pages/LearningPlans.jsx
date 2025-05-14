import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function LearningPlans() {
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await api.get('/learning-plans');
      setPlans(res.data);
    } catch {
      alert('Failed to fetch plans');
    }
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

  // Search & sort logic
  const filteredPlans = plans
    .filter(plan => {
      const term = searchTerm.toLowerCase();
      return (
        plan.title.toLowerCase().includes(term) ||
        plan.description.toLowerCase().includes(term) ||
        (plan.skill && plan.skill.toLowerCase().includes(term))
      );
    })
    .sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'period') {
        return a.learningPeriodInDays - b.learningPeriodInDays;
      }
      return 0;
    });

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">All Learning Plans</h2>

      {/* Search & Sort Controls */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {/* Search */}
        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium text-gray-600 mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by title, skill, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Sort by</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">None</option>
            <option value="title">Title (A-Z)</option>
            <option value="period">Learning Period (Days)</option>
          </select>
        </div>
      </div>

      {/* Plans List */}
      {filteredPlans.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No plans found.</p>
      ) : (
        <ul className="space-y-10 flex flex-col items-center">
          {filteredPlans.map((plan) => (
            <li
              key={plan.id}
              className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 w-full max-w-3xl transform hover:scale-[1.01]"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-2">{plan.title}</h3>
              <p className="text-gray-600 text-md mb-4 leading-relaxed">{plan.description}</p>

              <div className="flex flex-wrap gap-3 text-sm mb-5">
                <span className="bg-blue-100 text-blue-700 font-medium px-4 py-1 rounded-full border border-blue-200">
                  Skill: {plan.skill}
                </span>
                <span className="bg-green-100 text-green-700 font-medium px-4 py-1 rounded-full border border-green-200">
                  {plan.learningPeriodInDays} days
                </span>
                
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleEdit(plan.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition shadow-sm hover:shadow-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition shadow-sm hover:shadow-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
