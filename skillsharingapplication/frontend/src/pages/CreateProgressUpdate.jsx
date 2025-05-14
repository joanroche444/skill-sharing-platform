import { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateProgressUpdate() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/learning-plans').then(res => setPlans(res.data));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!selectedPlan) newErrors.selectedPlan = 'Please select a learning plan';
    if (!title) newErrors.title = 'Please select a progress template';
    if (!description.trim()) newErrors.description = 'Please enter a description';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.post('/learning-progress', {
        title,
        description,
        learningPlanId: selectedPlan,
        userId: 'test-user-1',
      });
      toast.success('Progress update posted!');
      navigate('/progress');
    } catch {
      toast.error('Failed to post update');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8"> Post Progress Update</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Plan Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Learning Plan</label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className={`w-full p-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                errors.selectedPlan ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-500'
              } hover:scale-[1.02]`}
            >
              <option value="">Select Learning Plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.title}
                </option>
              ))}
            </select>
            {errors.selectedPlan && <p className="text-red-500 text-sm mt-1">{errors.selectedPlan}</p>}
          </div>

          {/* Template Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Progress Template</label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                errors.title ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-500'
              } hover:scale-[1.02]`}
            >
              <option value="">Select Template</option>
              <option value="Completed Tutorial">Completed Tutorial</option>
              <option value="Learned New Skill">Learned New Skill</option>
              <option value="Finished Task">Finished Task</option>
            </select>
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-4 rounded-lg border resize-none transition-all duration-300 focus:outline-none focus:ring-2 ${
                errors.description ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-500'
              } hover:scale-[1.02]`}
              rows="5"
              placeholder="Describe your progress..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
               Submit Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
