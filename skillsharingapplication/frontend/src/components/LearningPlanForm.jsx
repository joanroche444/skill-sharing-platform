import { useState } from 'react';

export default function LearningPlanForm({ onSubmit, initialValues = {} }) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [skill, setSkill] = useState(initialValues.skill || '');
  const [tags, setTags] = useState(initialValues.tags?.join(', ') || '');
  const [learningPeriodInDays, setLearningPeriodInDays] = useState(initialValues.learningPeriodInDays || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      skill,
      tags: tags.split(',').map(tag => tag.trim()),
      learningPeriodInDays,
      tasks: [],
      userId: 'test-user-1' // Replace with real user
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="border p-2 w-full" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea className="border p-2 w-full" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Skill" value={skill} onChange={e => setSkill(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
      <input type="number" className="border p-2 w-full" placeholder="Learning period (days)" value={learningPeriodInDays} onChange={e => setLearningPeriodInDays(e.target.value)} />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Plan</button>
    </form>
  );
}