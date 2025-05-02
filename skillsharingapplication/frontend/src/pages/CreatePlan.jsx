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
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Learning Plan</h1>
      <LearningPlanForm onSubmit={handleSubmit} />
    </div>
  );
}