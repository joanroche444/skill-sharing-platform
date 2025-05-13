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
    <div className="py-10 flex justify-center px-7">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Post Progress Update</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full space-y-5">

          {/* Learning Plan Select */}
          <div>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className={`border p-3 w-full rounded focus:outline-none focus:ring-2 ${
                errors.selectedPlan ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-400'
              }`}
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
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`border p-3 w-full rounded focus:outline-none focus:ring-2 ${
                errors.title ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-400'
              }`}
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
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`border p-3 w-full rounded resize-none focus:outline-none focus:ring-2 ${
                errors.description ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-400'
              }`}
              rows="4"
              placeholder="Describe your progress..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
              type="submit"
            >
              Submit Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
