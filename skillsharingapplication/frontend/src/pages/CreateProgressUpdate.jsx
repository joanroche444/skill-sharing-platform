import { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateProgressUpdate() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/learning-plans').then(res => setPlans(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Post Progress Update</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={selectedPlan} onChange={e => setSelectedPlan(e.target.value)} className="border p-2 w-full">
          <option value="">Select Learning Plan</option>
          {plans.map(plan => <option key={plan.id} value={plan.id}>{plan.title}</option>)}
        </select>
        <select value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full">
          <option value="">Select Template</option>
          <option value="Completed Tutorial">Completed Tutorial</option>
          <option value="Learned New Skill">Learned New Skill</option>
          <option value="Finished Task">Finished Task</option>
        </select>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="border p-2 w-full" placeholder="Describe your progress..." />
        <button className="bg-green-500 text-white p-2 rounded" type="submit">Submit Update</button>
      </form>
    </div>
  );
}
