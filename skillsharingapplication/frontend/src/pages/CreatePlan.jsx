import LearningPlanForm from '../components/LearningPlanForm';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreatePlan() {
  const navigate = useNavigate();

  const handleSubmit = async (plan) => {
    try {
      await api.post('/learning-plans', plan);
      toast.success('Plan created!');
      navigate('/plans');
    } catch (error) {
      toast.error('Error creating plan');
    }
  };

  return (
    <div className="py-10 bg-gray-100 px-2">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-1000">Create Learning Plan</h2>
      <LearningPlanForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}