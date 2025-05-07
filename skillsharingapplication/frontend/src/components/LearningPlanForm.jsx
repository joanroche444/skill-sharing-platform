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
      userId: 'test-user-1', // Replace with real user
    });
  };

  return (
    <div className="py-10 flex justify-center bg-gray-400 px-7">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl space-y-5"
      >
        

        <input
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border border-gray-300 p-3 w-full rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <input
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          type="number"
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Learning period (days)"
          value={learningPeriodInDays}
          onChange={(e) => setLearningPeriodInDays(e.target.value)}
        />

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            Save Plan
          </button>
        </div>
      </form>
    </div>
  );
}
