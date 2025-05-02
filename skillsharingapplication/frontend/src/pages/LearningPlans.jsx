import { useEffect, useState } from 'react';
import api from '../api/api';

export default function LearningPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get('/learning-plans').then(res => setPlans(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Learning Plans</h2>
      <ul className="space-y-4">
        {plans.map(plan => (
          <li key={plan.id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{plan.title}</h3>
            <p>{plan.description}</p>
            <small>{plan.skill} | {plan.learningPeriodInDays} days</small>
          </li>
        ))}
      </ul>
    </div>
  );
}