import { useEffect, useState } from 'react';
import api from '../api/api';

export default function ProgressUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    api.get('/learning-progress').then(res => setUpdates(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Learning Progress Updates</h2>
      {updates.map(update => (
        <div key={update.id} className="border p-4 mb-4 rounded">
          <h3 className="font-semibold">{update.title}</h3>
          <p>{update.description}</p>
          <small>{new Date(update.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}