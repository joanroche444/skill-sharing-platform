import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import LearningPlanForm from '../components/LearningPlanForm'; // adjust path if needed

export default function EditLearningPlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    api.get(`/learning-plans/${id}`).then(res => {
      setInitialValues(res.data);
    });
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await api.put(`/learning-plans/${id}`, updatedData);
      navigate('/plans');
    } catch {
      alert('Update failed');
    }
  };

  if (!initialValues) return <div className="p-8">Loading...</div>;

  return (
    <div className="py-10 bg-gray-100 px-2">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-1000">Edit Learning Plan</h2>
        <LearningPlanForm onSubmit={handleUpdate} initialValues={initialValues} />
      </div>
    </div>
  );
  
}
